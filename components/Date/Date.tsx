import useDate from '@/hooks/date.hook'
import React from 'react'
import { View, Text } from 'react-native'

const Date: React.FC = () => {
    const date = useDate()

    return (
        <View className="w-full flex items-center  flex-row mt-[30px] px-[20px]">
            <View className='w-[210px]'>
                <Text className="text-[25px] font-semibold text-black">{date?.weekDay}</Text>
                <Text className="font-bold text-[120px] mt-[-20px]">{date.monthDay}</Text>
                <Text className="font-bold uppercase text-[100px] mt-[-10px]">{date.month}</Text>
            </View>

            <View className='bg-black w-[2px] h-full'></View>

            <View className='pl-[10px]'>
                <Text className='text-[30px]'>{date.time}</Text>
            </View>
        </View>
    )
}

export default Date
