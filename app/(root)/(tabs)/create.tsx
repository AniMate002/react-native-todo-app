import icons from '@/constants/icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, FlatList, StyleSheet, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DateTimePicker from '@react-native-community/datetimepicker';
import images from '@/constants/images'
import * as DocumentPicker from 'expo-document-picker';
import { categories, GeolocationI, IAttachment } from '@/utils/types'

import { LatLng, LeafletView, WebviewLeafletMessage } from 'react-native-leaflet-view';

const Create = () => {
    const [startDate, setStartDate] = useState<Date>(new Date())
    const [dueDate, setDueDate] = useState<Date>(new Date())
    const [attachments, setAttachments] = useState<Array<IAttachment>>([])
    const [location, setLocation] = useState<keyof typeof categories | string>("")
    const [geolocation, setGeolocation] = useState<GeolocationI>({lat: 1.305587412732045, lng: 103.83318545292657})

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

    const isImage = (mimeType: string) => {
        return mimeType === "image/jpeg" ||
        mimeType === "image/png" ||
        mimeType === "image/jpg" ||
        mimeType === "application/pdf"
    }

    return (
        <SafeAreaView className='h-full px-8 '>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-20'>
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
                    placeholder='Enter task name'
                    className='p-4 border-2 border-[#EBEBEB] rounded-full mt-2 text-black-300 focus:border-primary'/>
                </View>

                {/* DESCRIPTION */}
                <View className='mt-10 text-black-300'>
                    <Text className='font-rubik-medium'>Description</Text>
                    <TextInput 
                    placeholder='Describe everything in detail'
                    multiline={true}
                    className='p-4 border-2 border-[#EBEBEB] rounded-xl mt-2 text-black-300 w-full h-[80px] focus:border-primary'/>
                </View>

                {/* START DATE */}
                <View className='flex items-center justify-between mt-10 w-full flex-row'>
                    {/* START DATE */}
                        <Text className='font-rubik-medium'>Start Date</Text>
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={startDate}
                        mode={"datetime"}
                        // is24Hour={true}
                        onChange={(event, selectedDate) => {
                            setStartDate(selectedDate || new Date())
                        }}
                        />    
                </View>

                {/* DUE DATE */}
                <View className='flex items-center justify-between mt-4 w-full flex-row'>
                    {/* START DATE */}
                        <Text className='font-rubik-medium'>Due Date</Text>
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={dueDate}
                        mode={"datetime"}
                        // is24Hour={true}
                        onChange={(event, selectedDate) => {
                            setDueDate(selectedDate || new Date())
                        }}
                        />    
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


                {/* GEOLOCATION PICKER */}
                <Text className='font-rubik-medium mt-10'>Geolocation</Text>
                <View className='mt-2 h-[200px]'>
                    <LeafletView
                    onMessageReceived={e => handleAddMapMarker(e)}
                    doDebug={true}
                    zoom={15}
                    // mapCenterPosition={{ lat: geolocation.lat, lng: geolocation.lng }}
                    mapMarkers={[
                        {
                          id: 'location-marker',
                          icon: 'https://cdn-icons-png.flaticon.com/64/2776/2776067.png',
                          size: [64, 64],
                          iconAnchor: [32, 64],
                          position: {
                            lat: geolocation.lat,
                            lng: geolocation.lng,
                          },
                        },
                      ]}
                      mapLayers={[
                        {
                          baseLayer: true,
                          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        },
                      ]}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}



export default Create
