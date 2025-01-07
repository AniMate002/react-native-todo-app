import { useRouter } from 'expo-router'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const NoTasks:React.FC = () => {
    const router = useRouter()
    const handleCreateTask = () => router.navigate("/addtask")
    return (
        <TouchableOpacity 
        onPress={handleCreateTask}
        className='w-full bg-[#F6F6F6] mt-[50px] px-[30px] py-[20px] rounded-full flex flex-row items-center gap-4'>
            <View className='w-[60px] h-[60px] flex items-center justify-center bg-white rounded-full'>
                <Text className='font-semibold text-xl text-slate-600'>+</Text>
            </View>
            <Text className='font-semibold text-slate-700'>Create a new task</Text>
        </TouchableOpacity>
    )
}

export default NoTasks
