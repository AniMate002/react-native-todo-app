import images from '@/constants/images'
import useMainStore from '@/store/mainStore'
import { KEYS } from '@/utils/keys'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Redirect, router } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, SafeAreaView, Image, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'

const SignUp = () => {
    const [name, setName] = useState<string>("")
    const { createUser, authUser, isLoading } = useMainStore()

    const handleCreateUser = () => {
        createUser(name)
        setName("");
        router.push("/")
    };
    
    const handleCleanStorage = async () => {
        await AsyncStorage.removeItem(KEYS.storageKey)
        alert("Storage cleaned: " + KEYS.storageKey)
    }

    if(authUser) return <Redirect href={"/"}/>
    return (
        <SafeAreaView className='w-full h-full bg-secondary'>
            <ScrollView className='w-full h-screen'>
                <Image source={images.signup} resizeMode='contain' className='w-full h-[300px]'/>

                <Text className='uppercase text-black-200 text-xl tracking-widest text-center font-rubik'>Welcome to todo.io</Text>
                <Text className='text-3xl font-rubik-bold text-black-300 text-center mt-4'>
                    Let's Get You Closer to {"\n"}
                    <Text className='text-primary'>Your Ideal Home</Text>
                </Text>
                
                {
                    isLoading ?
                    <View className='flex items-center justify-center w-full mt-10'>
                        <ActivityIndicator size={"large"}/>
                    </View>
                    :
                    <View>
                        <TextInput 
                        value={name}
                        onChangeText={text => setName(text)}
                        placeholder='Enter Your Name' 
                        className='w-[80%] mx-auto mt-16 text-center bg-white py-4 rounded-full border-2 border-primary'/>
                        <TouchableOpacity
                        disabled={!name}
                        onPress={handleCreateUser} 
                        className='flex items-center justify-center w-[80%] mx-auto bg-green mt-4 py-5 rounded-full'>
                            <Text>Create</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress={handleCleanStorage} 
                        className='flex items-center justify-center w-[80%] mx-auto bg-green mt-4 py-5 rounded-full'>
                            <Text>Clean Storage</Text>
                        </TouchableOpacity>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp
