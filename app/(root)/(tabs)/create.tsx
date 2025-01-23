import icons from '@/constants/icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, FlatList, Alert, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import { categories, GeolocationI, IAttachment, ITask } from '@/utils/types'

import { WebviewLeafletMessage } from 'react-native-leaflet-view';
import useMainStore from '@/store/mainStore'
import Map from '@/components/Map'

const Create = () => {
    const { createNewTask, authUser } = useMainStore()
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [startDate, setStartDate] = useState<Date>(new Date())
    const [dueDate, setDueDate] = useState<Date>(new Date())
    const [location, setLocation] = useState<keyof typeof categories | string>("")
    const [attachments, setAttachments] = useState<Array<IAttachment>>([])
    const [geolocation, setGeolocation] = useState<GeolocationI>({lat: 1.305587412732045, lng: 103.83318545292657})

    const [showStartDateModal, setShowStartDateModal] = useState<boolean>(false)
    const [showDueDateModal, setShowDueDateModal] = useState<boolean>(false)


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

    const handleCreateTask = () => {
        // TODO: HANDLE TRIM FOR TITLE AND DESCRIPTION
        if(!title){
            return Alert.alert("Title is required", "Please enter the title of the task")
        }
        const newTask: ITask = {
            id: "",
            title,
            description,
            startDate,
            dueDate,
            location,
            attachments,
            geolocation,
            status: "in progress",
            personId: authUser?.id || ""
        }

        createNewTask(newTask)
        router.back()

    }

    

    return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='px-8 -py-10 mt-10'>
                {/* HEADER */}
                <View className='flex flex-row  items-center mt-4'>
                    <TouchableOpacity
                    onPress={() => router.back()}>
                        <View className='flex items-center justify-center size-16 bg-[#EBEBEB] rounded-full '>
                            <Image source={icons.backArrow} className='size-6'/>
                        </View>
                    </TouchableOpacity>
                    <Text className='font-rubik-medium ml-auto mr-auto'>Create Another Awesome Task</Text>
                    <Image source={icons.bell} className='size-6'/>
                </View>

                {/* FORM */}
                {/* TITLE */}
                <View className='mt-10 text-black-300'>
                    <Text className='font-rubik-medium'>Task name</Text>
                    <TextInput 
                    value={title}
                    onChangeText={text => setTitle(text)}
                    placeholder='Enter task name'
                    className='p-4 border-2 border-[#EBEBEB] rounded-full mt-2 text-black-300 focus:border-primary'/>
                </View>

                {/* DESCRIPTION */}
                <View className='mt-10 text-black-300'>
                    <Text className='font-rubik-medium'>Description</Text>
                    <TextInput 
                    value={description}
                    onChangeText={text => setDescription(text)}
                    placeholder='Describe everything in detail'
                    multiline={true}
                    className='p-4 border-2 border-[#EBEBEB] rounded-xl mt-2 text-black-300 w-full h-[80px] focus:border-primary'/>
                </View>

                {/* START DATE */}
                <View className='flex items-center justify-between mt-10 w-full flex-row'>
                    {/* START DATE */}
                        <Text className='font-rubik-medium'>Start Date</Text>
                        {
                            Platform.OS === "ios" || showStartDateModal
                            ?
                            <DateTimePicker
                            maximumDate={new Date(dueDate) || new Date()}
                            display='default'
                            value={startDate}
                            mode={"datetime"}
                            onChange={(event, selectedDate) => {
                                setShowStartDateModal(false)
                                console.log("CHANGING DATE")
                                setStartDate(selectedDate || new Date())
                            }}
                            />
                            :
                            <TouchableOpacity onPress={() => setShowStartDateModal(true)}>
                                <Text className='rounded-xl p-2 bg-[#EBEBEB]'>{new Date(startDate).toDateString()}</Text>
                            </TouchableOpacity>

                        }   
                </View>

                {/* DUE DATE */}
                <View className='flex items-center justify-between mt-4 w-full flex-row'>
                    {/* START DATE */}
                        <Text className='font-rubik-medium'>Due Date</Text>
                        {
                            Platform.OS === "ios" || showDueDateModal
                            ?
                            <DateTimePicker
                            // TODO: ADD MIN DATE EQUAL TO START DATE
                            minimumDate={new Date(startDate) || new Date()}
                            display='compact'
                            value={dueDate}
                            mode={"datetime"}
                            // is24Hour={true}
                            onChange={(event, selectedDate) => {
                                setShowDueDateModal(false)
                                console.log("CHANGING DATE")
                                setDueDate(selectedDate || new Date())
                            }}
                            />
                            :
                            <TouchableOpacity onPress={() => setShowDueDateModal(true)}>
                                <Text className='rounded-xl p-2 bg-[#EBEBEB]'>{new Date(dueDate).toDateString()}</Text>
                            </TouchableOpacity>

                        }
                </View>

                {/* LOCATION / CATEGORY */}
                <View className='mt-10'>
                    <Text className='font-rubik-medium'>Location/Category</Text>
                    <TextInput 
                    value={location}
                    onChangeText={text => setLocation(text)}
                    placeholder='Enter location manually or select from the list'
                    className='p-4 border-2 border-[#EBEBEB] rounded-full mt-2 text-black-300 focus:border-primary'/>
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
                            className={`${item === location ? "bg-emerald-500" : "bg-[#EBEBEB]"} px-12 py-4 rounded-full`}>
                                    <Text className={`${item === location ? "font-rubik-medium text-white" : "font-rubik text-black-300"}`}>{item}</Text>
                                </TouchableOpacity>
                        )}
                        />
                    </View>
                </View>


                {/* ATTACHMENT */}
                <View className='mt-10'>
                        <Text className='font-rubik-medium'>Attachments</Text>  
                        {/* RENDERED PICKED IMAGES */}
                        {
                            attachments.length > 0
                            ?
                            <View className='flex items-center justify-center gap-4 flex-row mt-2 flex-wrap group-last:justify-start'>
                                {attachments.filter(singleAttachment => isImage(singleAttachment.mimeType)).map((attachment, index) => (
                                    <TouchableOpacity 
                                    onPress={() => handleDeleteAttachment(attachment.name)}
                                    key={index} 
                                    className='flex items-center gap-2'>
                                        <Image source={{uri: attachment.uri}} className='size-24 rounded-xl'/>
                                        <Text>{attachment.name.length > 10 ? attachment.name.slice(0, 8) + "..." : attachment.name}</Text>
                                    </TouchableOpacity>
                                ))}
                                {attachments.filter(singleAttachment => !isImage(singleAttachment.mimeType)).map((attachment, index) => (
                                    <TouchableOpacity 
                                    onPress={() => handleDeleteAttachment(attachment.name)}
                                    key={index} 
                                    className='flex items-center gap-2'>
                                        <View className='flex items-center justify-center size-24 rounded-xl bg-emerald-500  border-emerald-700 '>
                                            <Text className='text-white font-rubik-medium'>File .{attachment.name.split(".").pop()}</Text>
                                        </View>
                                        <Text>{attachment.name.length > 10 ? attachment.name.slice(0, 8) + "..." : attachment.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            :
                            null
                        }
                        <TouchableOpacity
                        onPress={handlePickFiles}
                        >
                            <View className='flex items-center justify-center rounded-xl bg-[#EBEBEB] p-4 h-[100px] w-full mt-2 border-2 border-dashed border-emerald-500'>
                                <Image source={icons.info} className='size-6 bg-'/>
                                <Text>Upload the files</Text>
                                <Text className='text-sm text-black-200'>Max file size: 5MB</Text>
                            </View>
                        </TouchableOpacity>
                </View>


                {/* MAP */}
                {
                    Platform.OS === "ios"
                    ?
                    <Map geolocation={geolocation} handleAddMapMarker={handleAddMapMarker}/>
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
    )
}



export default Create
