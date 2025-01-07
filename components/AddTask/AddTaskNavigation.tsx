import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

// Navigation for AddTask Screen
const AddTaskNavigation = () => {
    const router = useRouter()
    return (
        <TouchableOpacity 
        onPress={() => router.back()}
        className=''
        >
            <Text className='text-blue-500 font-semibold'>&larr; Create Task</Text>
        </TouchableOpacity>
    )
}

export default AddTaskNavigation
