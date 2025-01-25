import icons from '@/constants/icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, FlatList, Alert, Platform, SafeAreaView } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import { categories, GeolocationI, IAttachment, ITask } from '@/utils/types'

import { WebviewLeafletMessage } from 'react-native-leaflet-view';
import useMainStore from '@/store/mainStore'
import Map from '@/components/Map'
import Header from '@/components/Header';
import Attachments from '@/components/Attachments';
import { Feather } from '@expo/vector-icons';
import IOSTimePicker from '@/components/IOSTimePicker';
import AndroidTimePicker from '@/components/AndroidTimePicker';

const Create = () => {
    const { createNewTask, authUser } = useMainStore()
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [startDate, setStartDate] = useState<Date>(new Date())
    const [dueDate, setDueDate] = useState<Date>(new Date())
    const [location, setLocation] = useState<keyof typeof categories | string>("Others")
    const [attachments, setAttachments] = useState<Array<IAttachment>>([])
    const [geolocation, setGeolocation] = useState<GeolocationI>({lat: 1.305587412732045, lng: 103.83318545292657})


    const isImage = (mimeType: string) => {
        return mimeType === "image/jpeg" ||
        mimeType === "image/png" ||
        mimeType === "image/jpg" ||
        mimeType === "application/pdf"
    }

    const handlePickFiles = async () => {
        try {
            const docRes = await DocumentPicker.getDocumentAsync({
                type: "*/*",
                multiple: true,
                copyToCacheDirectory: true,
            });
            if(!docRes || docRes.assets?.length === 0 || docRes.canceled) return

            setAttachments([...attachments, ...docRes.assets as Array<IAttachment>])
            console.log("Picked files: ", docRes)
        } catch (error) {
            console.log("Error in picking files: ", error)
        }
    }

    const handleDeleteAttachment = (name: string) => {
        const newAttachments = attachments.filter(attachment => attachment.name !== name)
        setAttachments(newAttachments)
    }

    const handleAddMapMarker = (e: WebviewLeafletMessage) => {
        if(e.event === "onMapClicked"){
            // Alert.alert("Map clicked", "You have clicked on the map")
            setGeolocation({lat: e.payload?.touchLatLng.lat, lng: e.payload?.touchLatLng.lng})
        }
    }

    const resetAllFields = () => {
        setTitle("")
        setDescription("")
        setAttachments([])
        setLocation("Others")
        setGeolocation({lat: 1.305587412732045, lng: 103.83318545292657})
        setStartDate(new Date())
        setDueDate(new Date())
    }

    const handleCreateTask = () => {
        if(!title.trim()){
            return Alert.alert("Title is required", "Please enter the title of the task")
        }
        if(dueDate.getTime() < startDate.getDate()) return Alert.alert("Wrongs date", "Start date can not be later than Due date.")
        const newTask: ITask = {
            id: "",
            title: title.trim(),
            description: description.trim(),
            startDate,
            dueDate,
            location: location || "Others",
            attachments,
            geolocation,
            status: "in progress",
            personId: authUser?.id || "",
            timestamp: new Date()
        }

        createNewTask(newTask)
        router.back()
        resetAllFields()

    }

    

    return (
        <View className='h-full dark:bg-[#111111]'>
            <SafeAreaView />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='px-8 pb-40'>
                {/* HEADER */}
                <Header title='Create Antother Awesome Task' customArrowButtonHandler={() => router.back()}/>

                {/* FORM */}
                {/* TITLE */}
                <View className='mt-10 '>
                    <Text className='font-rubik-medium text-black-300 dark:text-white'>Task name</Text>
                    <TextInput 
                    value={title}
                    onChangeText={text => setTitle(text)}
                    placeholder='Enter task name'
                    className='px-4 py-4 border-2 placeholder:text-gray-400 border-[#EBEBEB] dark:border-[#212622] rounded-full mt-2 text-black-300 dark:text-white focus:border-primary'/>
                </View>

                {/* DESCRIPTION */}
                <View className='mt-10'>
                    <Text className='font-rubik-medium text-black-300 dark:text-white'>Description</Text>
                    <TextInput 
                    value={description}
                    onChangeText={text => setDescription(text)}
                    placeholder='Describe everything in detail'
                    multiline={true}
                    className='p-4 border-2 placeholder:text-gray-400 border-[#EBEBEB] dark:border-[#212622] rounded-xl mt-2 text-black-300 dark:text-white w-full h-[80px] focus:border-primary'/>
                </View>

                {/* START DATE */}
                <View className='flex items-center justify-between mt-10 w-full flex-row'>
                        {/* START DATE */}
                        <Text className='font-rubik-medium text-black-300 dark:text-white'>Start Date</Text>
                        {
                            Platform.OS === "ios"
                            ?
                            <IOSTimePicker dateAndTime={startDate} maxDate={dueDate} onChange={(event, selectedDate) => {
                                console.log("CHANGING DATE")
                                setStartDate(selectedDate || new Date())
                            }}/>
                            :
                            <AndroidTimePicker dateAndTime={startDate} maxDate={dueDate} setFullDateAndTime={setStartDate}/>
                        }   
                </View>

                {/* DUE DATE */}
                <View className='flex items-center justify-between mt-4 w-full flex-row'>
                        {/* DUE DATE */}
                        <Text className='font-rubik-medium text-black-300 dark:text-white'>Due Date</Text>
                        {
                            Platform.OS === "ios"
                            ?
                            <IOSTimePicker dateAndTime={dueDate} minDate={startDate} onChange={(event, selectedDate) => {
                                console.log("CHANGING DATE")
                                setDueDate(selectedDate || new Date())
                            }}/>
                            :
                            <AndroidTimePicker dateAndTime={dueDate} minDate={startDate} setFullDateAndTime={setDueDate}/>
                        }
                        
                </View>

                {/* LOCATION / CATEGORY */}
                <View className='mt-10'>
                    <Text className='font-rubik-medium text-black-300 dark:text-white'>Location/Category</Text>
                    <TextInput 
                    value={location}
                    onChangeText={text => setLocation(text)}
                    placeholder='Enter location manually or select from the list'
                    className='p-4 border-2 placeholder:text-gray-400 placeholder:text-sm border-[#EBEBEB] dark:border-[#212622] rounded-full mt-2 text-black-300 dark:text-white focus:border-primary'/>
                    <View className='flex flex-wrap flex-row items-center gap-2 mt-2'>
                        <FlatList 
                        data={Object.keys(categories)}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerClassName='flex flex-row gap-2'
                        renderItem={({item, index}) => (
                            <TouchableOpacity 
                            onPress={() => setLocation(item)}
                            key={index} 
                            className={`${item === location ? "bg-emerald-500" : "bg-[#EBEBEB] dark:bg-[#414440]"} px-12 py-4 rounded-full`}>
                                    <Text className={`${item === location ? "font-rubik-medium text-white" : "font-rubik text-black-300 dark:text-white"}`}>{item}</Text>
                                </TouchableOpacity>
                        )}
                        />
                    </View>
                </View>


                {/* ATTACHMENT */}
                <View className='mt-10'>
                        <Text className='font-rubik-medium text-black-300 dark:text-white'>Attachments</Text>  
                        {/* RENDERED PICKED IMAGES */}
                        {
                            attachments.length > 0
                            ?
                            <Attachments attachments={attachments} handleDeleteAttachment={handleDeleteAttachment}/>
                            :
                            null
                        }
                        <TouchableOpacity
                        onPress={handlePickFiles}
                        >
                            <View className='flex items-center justify-center rounded-xl bg-[#EBEBEB] dark:bg-[#212622] p-4 h-[110px] w-full mt-2 border-2 border-dashed border-emerald-500'>
                                <Feather name='file-plus' size={24} color={"#585B58"}/>
                                <Text className='text-black-300 dark:text-white mt-1'>Upload the files</Text>
                                <Text className='text-sm text-black-200 dark:text-black-100'>Max file size: 50MB</Text>
                            </View>
                        </TouchableOpacity>
                </View>


                {/* MAP */}
                {
                    Platform.OS === "ios"
                    ?
                    <>
                        <Text className='font-rubik-medium mt-10 text-black-300 dark:text-white'>Geolocation</Text>
                        <Map geolocation={geolocation} handleAddMapMarker={handleAddMapMarker}/>
                    </>
                    :
                    null
                }

                {/* CREATE BUTTON */}
                <TouchableOpacity onPress={handleCreateTask}>
                    <View className='flex items-center justify-center bg-emerald-500 rounded-full p-4 mt-8'>
                        <Text className='text-white font-rubik-medium'>Create Task</Text>
                    </View>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}



export default Create
