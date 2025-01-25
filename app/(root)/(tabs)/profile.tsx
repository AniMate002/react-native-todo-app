import icons from '@/constants/icons'
import images from '@/constants/images'
import useMainStore from '@/store/mainStore'
import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import * as DocumentPicker from 'expo-document-picker';
import Log from '@/components/Log'
import Header from '@/components/Header'
import { router } from 'expo-router'

const Profile = () => {
    const { authUser, isLoading, updateAvatar, getLogsFromStorage, logs } = useMainStore()
    useEffect(() => {
        getLogsFromStorage().then(() => console.log("LOGS FROM STORAGE RECIEVED: ", logs))
    }, [])
    if(isLoading){
        return (
            <View className='h-full w-full flex items-center justify-center'>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    }

    const handlePickAvatar = async () => {
        try {
            const docRes = await DocumentPicker.getDocumentAsync({
                type: "image/*",
                multiple: false,
                copyToCacheDirectory: true,
            });
            if(!docRes || docRes.assets?.length === 0 || docRes.canceled) return
            console.log("Picked files: ", docRes)

            const pickedAvatarURI = docRes.assets[0].uri
            updateAvatar(pickedAvatarURI)

        } catch (error) {
            console.log("Error in picking files: ", error)
        }
    }
    return (
        <View className='h-full w-full dark:bg-[#111111]'>
            <SafeAreaView />
            <ScrollView className='w-full h-full px-8' contentContainerClassName='pb-40'>
                {/* HEADER */}
                <Header showLogOutBtn title='Profile' customArrowButtonHandler={() => router.back()}/>

                {/* AVATAR */}
                <View className='flex items-center mt-10 pb-5 border-b-2 border-[#dddddd] dark:border-[#222222]'>  
                    <TouchableOpacity onPress={handlePickAvatar}>
                        <Image source={{uri: authUser?.avatar || "https://avatar.iran.liara.run/public/8"}} resizeMode='cover' className='size-40 rounded-full'/>
                    </TouchableOpacity>
                    <Text className='mt-4 text-3xl font-rubik-medium text-black-300 dark:text-white'>{ authUser?.name }</Text>
                </View>


                {/* LOGS / HISTORY */}
                <Text className='mt-5 text-xl text-black-200'>Logs / History</Text>

                {
                    logs.length === 0
                    ?
                    <Text className='text-black-300 dark:text-white'>Empty</Text>
                    :
                    logs?.sort((a, b) => b.timestamp.toLocaleString().localeCompare(a.timestamp.toLocaleString()))?.map(log => <Log key={log.timestamp.toString()} {...log}/>)
                }

            </ScrollView>
        </View>
    )
}

export default Profile
