import React from 'react'
import { colors } from "@/constants/AllColors"
import { View, Text, TouchableOpacity  } from 'react-native'
import { useRouter } from 'expo-router'

export interface ITask {
    id: number,
    title: string,
    status: "in progress" | "completed" | "cancelled",
    description: string,
    date: string,
    location: string
}

const colorsArray = ["yellow", "grey", "purple", "red", "breeze", "green"]

// A REUSABLE TASK COMPONENTS FOR A SINGLE TASK
const Task: React.FC<ITask> = ({status, title, date, description, location, id}) => {
    const router = useRouter()
    // CHOOSING COLOR NAME DEPENDING ON INDEX
    const color = colorsArray[id % colorsArray.length] || "yellow";
    // GETTING BGCOLOR AND TEXTCOLOR FROM OBJECT USING COLOR NAME
    const bgColor = colors[color]["bg"]
    const textColor = colors[color]["text"]
    // BY CLICKING ON ANY TASK, IT WILL REDIRECT TO A SCREEN WITH DETAILED INFO
    const handleTaskClick = () => {
        router.navigate(`/${id}`)
    }
    return (
        <TouchableOpacity 
        onPress={handleTaskClick}
        style={{backgroundColor: bgColor}} 
        className={`w-full rounded-2xl p-[20px] min-h-[200px] flex justify-between`}
        >
            <View className='flex items-start justify-between flex-row'>
                <Text style={{color: textColor}} className='text-3xl font-semibold text-slate-500 max-w-[60%] max-h-[110px] whitespace-nowrap overflow-hidden text-ellipsis'>{title}</Text>
                <Text className='text-2xl font-semibold text-slate-200 max-w-[40%] overflow-hidden whitespace-nowrap text-ellipsis'>{location}</Text>
            </View>
            <View className='flex items-center justify-between flex-row w-full'>
                <Text style={{color: textColor}} className='font-semibold'>{date}</Text>
                <View style={{backgroundColor: textColor}} className=' w-[120px] h-[30px] flex items-center justify-center  text-center rounded-xl'>
                    <Text className=' text-white uppercase text-[13px] font-semibold'>{status}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}



export default Task
