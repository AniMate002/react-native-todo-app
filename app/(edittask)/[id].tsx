import { ITask } from '@/components/Task'
import useBasicStore from '@/store/useBasicStore'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'


// DYNAMIC ROUTE FOR EACH TASK INDIVIDUALLY (SHOULD BE CALLED DETAILSTASK INSTEAD OF EDITTASK)
const EditTask = () => {
    // GETTING DYNAMIC ID
    const { id } = useLocalSearchParams()
    const router = useRouter()
    // EXPORTING ZUSTAND METHODS
    const { getTaskById, deleteTaskById, changeStatusById } = useBasicStore(state => state)
    // STATE FOT A CURRENTLY DISPLAYED TASK
    const [ task, setTask ] = useState<ITask | null>()
    // LOOK FOR THE TASK IN THE STORE AND ASSIGNING IT TO THE STATE
    useEffect(() => {
        setTask(getTaskById(Number(id)))
    }, [])
    // DELETING TASK
    const handleDeleteTask = () => {
        deleteTaskById(Number(id))
        router.replace("/alltasks")
    }
    // CHANGING STATUS OF A TASK
    const handleChangeStatus = (status: "in progress" | "completed" | "cancelled") => {
        if(task){
            changeStatusById(status, Number(id))
            setTask({...task, status})
        }
    }
    return (
        <View className='w-screen h-screen bg-[#E5E6E1]'>
                {/* TITLE */}
                <Text className='text-center mt-16 font-bold text-3xl text-slate-800 w-[70%] mx-auto'>{task?.title}</Text>
                {/* LOCATION */}
                <Text className='text-blue-400 text-center mt-[20px]'>{task?.location}</Text>
                {/* STATUS (ONLY TEXT) */}
                <Text className='text-center uppercase text-sm font-bold text-slate-800'>{task?.status}</Text>
                {/* DESCRIPTION */}
                <Text className='text-slate-600 w-[70%] mx-auto text-center mt-[20px]'>{task?.description}</Text>
                {/* DATE */}
                <Text className='text-sm text-center mt-[30px] text-slate-500'>{task?.date}</Text>
                

                {/* A PANNEL WITH THREE BUTTONS FOR CHANGING A STATUS OF A TASK */}
                <View className='w-[90%] flex-row items-center justify-center gap-1 mx-auto mt-[100px]'>
                    {/* CANCELLED */}
                    <TouchableOpacity 
                    onPress={() => handleChangeStatus("cancelled")}
                    className='flex justify-center items-center w-[33%] h-[100px]  bg-[#CB9CA4]  rounded-xl'>
                        <Text className='text-[#5D252A] uppercase font-bold '>
                            cancelled
                        </Text>
                    </TouchableOpacity>
                    {/* IN PROGRESS */}
                    <TouchableOpacity 
                    onPress={() => handleChangeStatus("in progress")}
                    className='flex justify-center items-center w-[33%] h-[100px]  bg-[#E4B975]  rounded-xl'>
                        <Text className='text-[#67461B] uppercase font-bold '>
                            In progress
                        </Text>
                    </TouchableOpacity>
                    {/* COMPLETED */}
                    <TouchableOpacity 
                    onPress={() => handleChangeStatus("completed")}
                    className='flex justify-center items-center w-[33%] h-[100px]  bg-[#BFCC97]  rounded-xl'>
                        <Text className='text-[#4F633B] uppercase font-bold '>
                            Completed
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* DELETE TASK BUTTON */}
                <TouchableOpacity
                onPress={handleDeleteTask}
                className='absolute bottom-[100px] w-[98%] left-[1%]'
                >
                    <Text className='bg-red-500 mb-[60px] uppercase font-semibold text-lg text-white rounded-xl py-[10px] text-center'>delete task</Text>
                </TouchableOpacity>
        </View>
    )
}

export default EditTask
