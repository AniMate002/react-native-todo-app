import Attachments from '@/components/Attachments'
import Header from '@/components/Header'
import Map from '@/components/Map'
import icons from '@/constants/icons'
import useMainStore from '@/store/mainStore'
import { StatusType } from '@/utils/types'
import { router, useLocalSearchParams } from 'expo-router'
import { useColorScheme } from 'nativewind'
import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, ScrollView, SafeAreaView, TouchableOpacity, Image, Platform, StatusBar } from 'react-native'

const Properties = () => {
    const { id } = useLocalSearchParams()
    const { getTaskById, currentTask, isLoading, changeTaskStatusById, deleteTaskById } = useMainStore()
    const [status, setStatus] = useState<StatusType>(currentTask?.status || "not started")
    const { colorScheme } = useColorScheme()
    useEffect(() => {
        getTaskById(id.toString())
    }, [id])

    if(isLoading){
        return <ActivityIndicator size={'large'}/>
    }

    const handleChangeStatus = (status: StatusType) => {
        setStatus(status)
    }

    const handleDeleteTask = () => {
        if(!isLoading && currentTask) {
            router.navigate("/")
            deleteTaskById(currentTask.id)
        }
    }

    const handlePushUpdates = () => {
        if(!currentTask || !currentTask.id) return
        if(status !== currentTask.status) changeTaskStatusById(currentTask.id, status)
        router.back()
    }



    return (
        <View className='w-full h-full dark:bg-[#111111]'>
            <StatusBar
                barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={colorScheme === 'dark' ? '#111111' : "#f5f5f5"}
            />
            <SafeAreaView />
            <ScrollView className='w-full px-8 h-full' contentContainerClassName='pb-32'>
                {/* HEADER */}
                <Header title='Current Task' customArrowButtonHandler={handlePushUpdates}/>

                {/* MAIN */}
                <Text className='mt-10 font-rubik-medium text-2xl text-black-300 dark:text-white'>
                    {currentTask?.title}
                </Text>
                
                {/* LOCAITON/CATEGORY */}
                <View className='flex flex-row mt-4 items-center'>
                    <Text className='py-1 px-2 bg-emerald-200 text-emerald-500 rounded-full text-primary-300 uppercase font-rubik-bold text-xs'>{currentTask?.location || "Others"}</Text>
                </View>

                {/* DESCRIPTION */}
                <Text className='font-rubik-medium text-xl mt-10 text-black-300 dark:text-white'>Overview</Text>
                <Text className='text-black-200 dark:text-black-100 mt-2'>{currentTask?.description || "(No description)"}</Text>

                {/* CHANGE STATUS */}
                <Text className='font-rubik-medium text-xl mt-10 text-black-300 dark:text-white'>Change Status</Text>
                <View className='flex items-center w-full flex-row mt-2 gap-2'>
                    <TouchableOpacity onPress={() => handleChangeStatus("not started")}>
                        <Text className={`flex-1 text-center ${status === "not started" ? "bg-red-200 text-red-700 font-rubik-medium" : "bg-[#dddddd] dark:bg-[#282828] text-black-300 dark:text-white"} p-2 rounded-xl`}>Not started</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleChangeStatus("in progress")}>
                        <Text className={`flex-1 text-center ${status === "in progress" ? "bg-yellow-200 text-yellow-700 font-rubik-medium" : "bg-[#dddddd] dark:bg-[#282828] text-black-300 dark:text-white"} p-2 rounded-xl`}>In progress</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleChangeStatus("completed")}>
                        <Text className={`flex-1 text-center ${status === "completed" ? "bg-emerald-200 text-emerald-700 font-rubik-medium" : "bg-[#dddddd] dark:bg-[#282828] text-black-300 dark:text-white"} p-2 rounded-xl`}>Completed</Text>
                    </TouchableOpacity>
                </View>

                {/* DUE/START DATE */}
                <Text className='font-rubik-medium text-xl mt-10 text-black-300 dark:text-white'>Deadline</Text>
                <View className='flex items-center w-full flex-row'>
                    <Text className='text-black-300 dark:text-white'>Start Date</Text>
                    <Text className='rounded-xl p-2 bg-[#dddddd] dark:bg-[#343734] text-black-300 dark:text-white ml-auto'>{new Date(currentTask?.startDate || "").toDateString()}</Text>
                    <Text className='rounded-xl p-2 bg-[#dddddd] dark:bg-[#343734] text-black-300 dark:text-white ml-2'>{new Date(currentTask?.startDate || "").toTimeString().slice(0, 5)}</Text>
                </View>
                <View className='flex items-center w-full flex-row mt-2'>
                    <Text className='text-black-300 dark:text-white'>Due Date</Text>
                    <Text className='rounded-xl p-2 bg-[#dddddd] dark:bg-[#343734] text-black-300 dark:text-white ml-auto'>{new Date(currentTask?.dueDate || "").toDateString()}</Text>
                    <Text className='rounded-xl p-2 bg-[#dddddd] dark:bg-[#343734] text-black-300 dark:text-white ml-2'>{new Date(currentTask?.dueDate || "").toTimeString().slice(0, 5)}</Text>
                </View>

                {/* ATTACHMENTS */}
                <Text className='font-rubik-medium text-xl mt-10 text-black-300 dark:text-white'>Attachments</Text>
                {
                    currentTask?.attachments.length === 0
                    ?
                    <Text className='mt-2 text-black-200'>(No attachments)</Text>
                    :
                    <View className='flex items-center flex-wrap mt-2'>
                        <Attachments attachments={currentTask?.attachments || []} handleDeleteAttachment={() => ""}/>
                    </View>
                }

                {/* MAP */}
                {
                    Platform.OS === "ios"
                    ?
                    <>
                        <Text className='font-rubik-medium text-xl mt-10 text-black-300 dark:text-white'>Geolocation</Text>
                        <Map geolocation={currentTask?.geolocation || {lat: 1.7, lng: 0.9}} handleAddMapMarker={() => ""}/>
                    </>
                    :
                    null
                }

                {/* DELETE TASK BUTTON */}
                <TouchableOpacity onPress={handleDeleteTask}>
                    <Text className='w-full flex items-center justify-center bg-red-600 text-white font-medium text-center rounded-xl py-4 mt-4'>Delete Task</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Properties
