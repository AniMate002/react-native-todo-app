import React from 'react'
import { View, Text } from 'react-native'

const NoResult = () => {
    return (
        <View className='flex items-center justify-center w-full bg-[#EBEBEB] dark:bg-[#414440] mt-10 rounded-xl py-10'>
            <Text className='font-rubik-light text-black-300 dark:text-white'>No Tasks Found</Text>
        </View>
    )
}

export default NoResult
