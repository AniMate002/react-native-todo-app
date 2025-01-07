import { ISortTypes } from '@/hooks/task.hook'
import React from 'react'
import { View, Text, TextInput, TouchableOpacity, SectionListComponent } from 'react-native'

export interface ISortTasks {
    sortBy: ISortTypes,
    setSortBy: React.Dispatch<React.SetStateAction<ISortTypes>>
}

const SortTasks:React.FC<ISortTasks> = ({ sortBy, setSortBy }) => {
    return (
        <View className='flex flex-row justify-evenly items-center w-full p-[10px]'>            
            <TouchableOpacity 
            onPress={() => setSortBy("alphDesc")}
            className='flex items-center justify-center h-[60px] w-[60px] bg-[#D9D9D9] rounded-full'>
                <Text>A-z &darr;</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => setSortBy("dateAsc")}
            className='flex items-center justify-center h-[60px] w-[60px] bg-[#D9D9D9] rounded-full'>
                <Text>Date &uarr;</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => setSortBy("statusAsc")}
            className='flex items-center justify-center h-[60px] w-[60px] bg-[#D9D9D9] rounded-full'>
                <Text>Status &uarr;</Text>
            </TouchableOpacity>
            
        </View>
    )
}

export default SortTasks
