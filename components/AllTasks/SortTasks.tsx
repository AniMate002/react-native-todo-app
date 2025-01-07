import useBasicStore from '@/store/useBasicStore'
import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, SectionListComponent } from 'react-native'

type TsortType = "date" | "status" | "title"
type Torder = "asc" | "desc"

const SortTasks:React.FC = () => {
    const [sortType, setSortType] = useState<TsortType>("date")
    const [order, setOrder] = useState<Torder>("asc")
    const { sortTasks } = useBasicStore(store => store)
    const handleSort = (localSortType: TsortType, localOrder: Torder) => {
        if(sortType === localSortType) setOrder(order === "asc" ? "desc" : "asc")
        else{
            setSortType(localSortType)
            setOrder("asc")
        }
    }
    useEffect(() => {
        sortTasks(sortType, order)
    }, [sortType, order])
    return (
        <View className='flex flex-row gap-4 items-center w-full p-[10px]'>    
            <Text className=' font-semibold text-xl'>Sort by:</Text>

            <TouchableOpacity 
            onPress={() => handleSort("title", 'asc')}
            className='flex items-center justify-center h-[30px] w-[60px] bg-[#7dc7ff] rounded-xl'>
                <Text className='text-white font-semibold'>Name</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => handleSort("date", 'asc')}
            className='flex items-center justify-center h-[30px] w-[60px] bg-[#7dc7ff] rounded-xl'>
                <Text className='text-white font-semibold'>Date</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => handleSort("status", 'asc')}
            className='flex items-center justify-center h-[30px] w-[60px] bg-[#7dc7ff] rounded-xl'>
                <Text className='text-white font-semibold'>Status</Text>
            </TouchableOpacity>
            
        </View>
    )
}

export default SortTasks
