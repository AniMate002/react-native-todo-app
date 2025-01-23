import icons from '@/constants/icons'
import { router } from 'expo-router'
import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Create = () => {
    return (
        <SafeAreaView className='h-full px-8 '>
            <ScrollView>
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
            </ScrollView>
        </SafeAreaView>
    )
}

export default Create
