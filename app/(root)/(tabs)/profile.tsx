import icons from '@/constants/icons'
import images from '@/constants/images'
import useMainStore from '@/store/mainStore'
import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import * as DocumentPicker from 'expo-document-picker';
import Log from '@/components/Log'

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
        <SafeAreaView className='h-full w-full'>
            <ScrollView className='w-full h-full px-8' contentContainerClassName='pb-40'>
                {/* HEADER */}
                <View className='flex items-center justify-between flex-row mt-4'>  
                    <Text className='text-2xl font-rubik-medium'>Profile</Text>
                    <Image source={icons.bell} className='size-6'/>
                </View>

                {/* AVATAR */}
                <View className='flex items-center mt-10 pb-5 border-b-2 border-[#dddddd]'>  
                    <TouchableOpacity onPress={handlePickAvatar}>
                        <Image source={{uri: authUser?.avatar || "https://avatar.iran.liara.run/public/8"}} resizeMode='cover' className='size-40 rounded-full'/>
                    </TouchableOpacity>
                    <Text className='mt-4 text-3xl font-rubik-medium text-black-300'>{ authUser?.name }</Text>
                </View>


                {/* LOGS / HISTORY */}
                <Text className='mt-5 text-xl text-black-200'>Logs / History</Text>

                {
                    logs.length === 0
                    ?
                    <Text>Empty</Text>
                    :
                    logs?.sort((a, b) => b.timestamp.toLocaleString().localeCompare(a.timestamp.toLocaleString()))?.map(log => <Log key={log.timestamp.toString()} {...log}/>)
                }

            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile
