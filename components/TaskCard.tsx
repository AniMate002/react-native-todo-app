import icons from '@/constants/icons'
import { colors, ITask } from '@/utils/types'
import { router } from 'expo-router';
import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';

interface TaskCardPoprs extends ITask { }

const TaskCard = React.memo(({ title, status, location, startDate, dueDate, id }: TaskCardPoprs) => {
    const randomColorIndex = Math.floor(Math.random() * colors.length)
    const randomColor = colors[randomColorIndex]
    const startDateFormatted = new Date(startDate)
    const dueDateFormatted = new Date(dueDate)
    const currentDate = new Date();
    // Calculate progress
    const totalTime = dueDateFormatted.getTime() - startDateFormatted.getTime(); // in ms
    const elapsedTime = Math.max(0, currentDate.getTime() - startDateFormatted.getTime()); // in ms
    const progress = Math.min(100, (elapsedTime / totalTime) * 100).toFixed(1) || 0; // limit to 100%
    return (
        <TouchableOpacity
            onPress={() => router.navigate(`/properties/${id}`)}
            activeOpacity={0.8}
            style={{ backgroundColor: randomColor.bg }}
            className='w-full rounded-2xl py-4 px-6 mt-4 h-[180px] flex flex-col shadow-none dark:shadow-lg  dark:shadow-black-200'>
            <View className='flex flex-row items-start justify-between w-full'>
                <Text style={{ color: randomColor.text }} className='w-2/3 text-2xl font-rubik-semibold'>{title}</Text>
                <Text className='bg-black-300 text-white font-rubik-medium py-2 px-4 rounded-full'>{status}</Text>
            </View>
            <Text className='text-black-200 tracking-widest mt-2'>{location}</Text>
            <View className='flex items-end flex-row justify-between mt-auto'>
                <View className='flex items-center flex-row mt-8'>
                    <Image source={icons.clock} className='size-6' />
                    <Text className='ml-2 font-rubik-medium text-black-200'>{startDateFormatted.getDate()}.{startDateFormatted.getMonth() + 1} - {dueDateFormatted.getDate()}.{dueDateFormatted.getMonth() + 1}</Text>
                </View>
                <AnimatedCircularProgress
                    size={70}
                    width={10}
                    duration={0}
                    fill={isNaN(Number(progress)) || Number(progress) < 0 ? 100 : Number(progress)}
                    onAnimationComplete={() => console.log('onAnimationComplete')}
                    tintColor={randomColor.text}
                    rotation={0}
                    backgroundColor={randomColor.bg}>
                    {
                        (fill) => (
                            <Text className='font-rubik-medium text-black-200'>
                                {fill}%
                            </Text>
                        )
                    }
                </AnimatedCircularProgress>
            </View>
        </TouchableOpacity>
    )
})

export default TaskCard
