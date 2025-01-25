import useMainStore from '@/store/mainStore'
import { ILog } from '@/utils/types'
import { router } from 'expo-router'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

interface LogProps extends ILog {}

const Log: React.FC<LogProps> = ({ type, timestamp, taskId, status }) => {
    const { tasks } = useMainStore()
    const taskExists = taskId ? tasks.find(task => task.id === taskId) : null
    return (
        <View className="flex flex-row items-center justify-between w-full rounded-xl bg-white dark:bg-[#282828] p-4 mt-2 ">
            <View className='flex-1 gap-1 items-start'>
                <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 capitalize">{type}</Text>
                {
                    status
                    ?
                    <Text className='px-2 rounded-full bg-[#EBEBEB] dark:bg-[#414440] text-sm font-rubik-semibold text-black-200 dark:text-black-100 '>{status}</Text>
                    :
                    null
                }
                <Text className="text-sm text-gray-500">
                    {new Date(timestamp).toLocaleString()}
                </Text>
            </View>
            {
                taskId
                ?
                taskExists 
                ? 
                <TouchableOpacity
                    onPress={() => router.push(`/properties/${taskId}`)}
                    className="bg-emerald-500 rounded-full px-4 py-2"
                >
                    <Text className="text-white text-sm font-medium">See Task</Text>
                </TouchableOpacity>
                :
                <View
                    
                    className="bg-red-500 rounded-xl px-4 py-2"
                >
                    <Text className="text-white text-sm font-medium">Task Was Deleted</Text>
                </View>
                : 
                null
            }
        </View>
    )
}

export default Log
