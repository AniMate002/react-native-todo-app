import useBasicStore from '@/store/useBasicStore'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

type TsortType = "date" | "status" | "title"
type Torder = "asc" | "desc"

const SortTasks:React.FC = () => {
    // STATE FOR A SORT TYPE
    const [sortType, setSortType] = useState<TsortType>("date")
    // STATE FOR AN ORDER
    const [order, setOrder] = useState<Torder>("desc")
    // IMPORTING SORT METHOD FROM STORE 
    const { sortTasks } = useBasicStore(store => store)
    // SORT HANDLER
    const handleSort = (localSortType: TsortType, localOrder: Torder) => {
        // IF SORT TYPE IS THE SAME BUT BUTTON IS CLICKED, THEN CHANGE ORDER FROM ASC TO DESC AND VICE VERSA
        if(sortType === localSortType) setOrder(order === "asc" ? "desc" : "asc")
        else{
        // OTHERWISE SIMPLE CHAGE SORT TYPE AND RESTORE ORDER
            setSortType(localSortType)
            setOrder("asc")
        }
    }
    useEffect(() => {
        // INVOKES SORT HANDLER EVERY TIME SORT TYPE OR ORDER IS CHANGED
        sortTasks(sortType, order)
    }, [sortType, order])
    return (
        <View className='flex flex-row gap-4 items-center w-full p-[10px]'>   
             {/* HEADER */}
            <Text className=' font-semibold text-xl'>Sort by:</Text>
            {/* SORT BY TITLE */}
            <TouchableOpacity 
            onPress={() => handleSort("title", 'asc')}
            className='flex items-center justify-center h-[30px] w-[60px] bg-[#7dc7ff] rounded-xl'>
                <Text className='text-white font-semibold'>Name</Text>
            </TouchableOpacity>
            {/* SORT BY DATE */}
            <TouchableOpacity 
            onPress={() => handleSort("date", 'asc')}
            className='flex items-center justify-center h-[30px] w-[60px] bg-[#7dc7ff] rounded-xl'>
                <Text className='text-white font-semibold'>Date</Text>
            </TouchableOpacity>
            {/* SORT BY STATUS */}
            <TouchableOpacity 
            onPress={() => handleSort("status", 'asc')}
            className='flex items-center justify-center h-[30px] w-[60px] bg-[#7dc7ff] rounded-xl'>
                <Text className='text-white font-semibold'>Status</Text>
            </TouchableOpacity>
            
        </View>
    )
}

export default SortTasks
