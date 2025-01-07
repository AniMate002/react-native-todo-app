import React from 'react'
import { colors } from "@/constants/AllColors"
import { View, Text, TouchableOpacity, StyleSheet  } from 'react-native'

export interface ITask {
    id: number,
    title: string,
    status: "in progress" | "completed" | "not started" | "failed" | "put off",
    description: string,
    date: string,
    location: string
}

const colorsArray = ["yellow", "grey", "purple", "red", "breeze", "green"]

const Task: React.FC<ITask> = ({status, title, date, description, location, id}) => {
    const color = colorsArray[id % colorsArray.length];
    const bgColor = colors[color]["bg"]
    const textColor = colors[color]["text"]
    // alert("Color for " + title+ " is "+ colors[color]["bg"])
    return (
        <View style={{backgroundColor: bgColor}} className={`w-full rounded-2xl p-[20px] min-h-[200px] flex justify-between`}>
            <View className='flex items-start justify-between flex-row'>
                <Text style={{color: textColor}} className='text-3xl font-semibold text-slate-500 max-w-[60%] max-h-[110px] whitespace-nowrap overflow-hidden text-ellipsis'>{title}</Text>
                <Text className='text-2xl font-semibold text-slate-200 max-w-[40%] overflow-hidden whitespace-nowrap text-ellipsis'>{location}</Text>
            </View>
            <View style={{backgroundColor: textColor}} className=' w-[120px] h-[30px] flex items-center justify-center  text-center rounded-xl'>
                <Text className=' text-white uppercase text-[13px] font-semibold'>{status}</Text>
            </View>
            <View className='flex items-center justify-between flex-row w-full'>
                <Text style={{color: textColor}} className='font-semibold'>{date.split(', ')[0]}</Text>
                <Text style={{color: textColor}} className='font-semibold'>{date.split(', ')[1]}</Text>
            </View>
        </View>
    )
}



export default Task
