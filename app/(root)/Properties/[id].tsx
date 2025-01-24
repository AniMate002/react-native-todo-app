import Attachments from '@/components/Attachments'
import Map from '@/components/Map'
import icons from '@/constants/icons'
import useMainStore from '@/store/mainStore'
import { StatusType } from '@/utils/types'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native'

const Properties = () => {
    const { id } = useLocalSearchParams()
    const { getTaskById, currentTask, isLoading, changeTaskStatusById } = useMainStore()
    const [status, setStatus] = useState<StatusType>(currentTask?.status || "not started")
    useEffect(() => {
        getTaskById(id.toString())
    }, [id])

    if(isLoading){
        return <ActivityIndicator size={'large'}/>
    }

    const handleChangeStatus = (status: StatusType) => {
        setStatus(status)
    }

    // useEffect(() => {
    //     if(!currentTask || !currentTask.id) return
    //     changeTaskStatusById(currentTask.id, status)
    // }, [])

    const handlePushUpdates = () => {
        if(!currentTask || !currentTask.id) return
        if(status !== currentTask.status) changeTaskStatusById(currentTask.id, status)
        router.back()
    }

    return (
        <SafeAreaView className='w-full h-full'>
            <ScrollView className='w-full px-8 h-full'>
                {/* HEADER */}
                <View className='flex flex-row  items-center mt-2'>
                    <TouchableOpacity
                    onPress={handlePushUpdates}>
                        <View className='flex items-center justify-center size-16 bg-[#EBEBEB] rounded-full '>
                            <Image source={icons.backArrow} className='size-6'/>
                        </View>
                    </TouchableOpacity>
                    <Text className='font-rubik-medium ml-auto mr-auto'>Current Task</Text>
                    <Image source={icons.bell} className='size-6'/>
                </View>

                {/* MAIN */}
                <Text className='mt-10 font-rubik-medium text-2xl text-black-300'>
                    {currentTask?.title}
                </Text>
                
                {/* LOCAITON/CATEGORY */}
                <View className='flex flex-row mt-4 items-center'>
                    <Text className='py-1 px-2 bg-emerald-200 text-emerald-500 rounded-full text-primary-300 uppercase font-rubik-bold text-xs'>{currentTask?.location || "Others"}</Text>
                </View>

                {/* DESCRIPTION */}
                <Text className='font-rubik-medium text-xl mt-10'>Overview</Text>
                <Text className='text-black-200 mt-2'>{currentTask?.description || "(No description)"}</Text>

                {/* CHANGE STATUS */}
                <Text className='font-rubik-medium text-xl mt-10'>Change Status</Text>
                <View className='flex items-center w-full flex-row mt-2 gap-2'>
                    <TouchableOpacity onPress={() => handleChangeStatus("not started")}>
                        <Text className={`flex-1 text-center ${status === "not started" ? "bg-red-200 text-red-700 font-rubik-medium" : "bg-[#dddddd] text-black-300"} p-2 rounded-xl`}>Not started</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleChangeStatus("in progress")}>
                        <Text className={`flex-1 text-center ${status === "in progress" ? "bg-yellow-200 text-yellow-700 font-rubik-medium" : "bg-[#dddddd] text-black-300"} p-2 rounded-xl`}>In progress</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleChangeStatus("completed")}>
                        <Text className={`flex-1 text-center ${status === "completed" ? "bg-emerald-200 text-emerald-700 font-rubik-medium" : "bg-[#dddddd] text-black-300"} p-2 rounded-xl`}>Completed</Text>
                    </TouchableOpacity>
                </View>

                {/* DUE/START DATE */}
                <Text className='font-rubik-medium text-xl mt-10'>Deadline</Text>
                <View className='flex items-center w-full flex-row'>
                    <Text>Start Date</Text>
                    <Text className='rounded-xl p-2 bg-[#dddddd] ml-auto'>{new Date(currentTask?.startDate || "").toDateString()}</Text>
                    <Text className='rounded-xl p-2 bg-[#dddddd] ml-2'>{new Date(currentTask?.startDate || "").toTimeString().slice(0, 5)}</Text>
                </View>
                <View className='flex items-center w-full flex-row mt-2'>
                    <Text>Due Date</Text>
                    <Text className='rounded-xl p-2 bg-[#dddddd] ml-auto'>{new Date(currentTask?.dueDate || "").toDateString()}</Text>
                    <Text className='rounded-xl p-2 bg-[#dddddd] ml-2'>{new Date(currentTask?.dueDate || "").toTimeString().slice(0, 5)}</Text>
                </View>

                {/* ATTACHMENTS */}
                <Text className='font-rubik-medium text-xl mt-10'>Attachments</Text>
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
                <Text className='font-rubik-medium text-xl mt-10'>Geolocation</Text>
                <Map geolocation={currentTask?.geolocation || {lat: 1.7, lng: 0.9}} handleAddMapMarker={() => ""}/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Properties
