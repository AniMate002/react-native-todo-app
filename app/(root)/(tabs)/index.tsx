import Category from '@/components/Category'
import icons from '@/constants/icons'
import useMainStore from '@/store/mainStore'
import { categories } from '@/utils/types'
import { Link } from 'expo-router'
import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'

const Home = () => {
    const { getAllUsers } = useMainStore()
    const { authUser } = useMainStore()
    useEffect(() => {
        getAllUsers()
    }, [])
    
    return (
        <SafeAreaView className='h-full mx-10'>
            {/* HEADER */}
            <View>
                <Text className='font-semibold text-3xl mt-6'>Hi, {authUser?.name}</Text>
                <Text className='text-black-100 mt-2'>06 task pending</Text>
            </View>


            {/* SEARCH */}
            <View className='flex flex-row items-center justify-between mt-10'>
                <View className='flex items-center flex-row bg-[#EBEBEB] rounded-full px-4 py-2 w-3/4'>
                    <TouchableOpacity>
                        <Image source={icons.search} className='size-8'/>
                    </TouchableOpacity>
                    <TextInput placeholder='Search' className='text-2xl p-4'/>
                </View>

                <TouchableOpacity>
                    <View className='bg-black-300 rounded-full p-4'>
                        <Image source={icons.filter} className='size-8'/>
                    </View>
                </TouchableOpacity>
            </View>

            {/* CATEGORIES */}
            <Text className='font-rubik text-black-300 text-2xl mt-10'>Categories</Text>
            <View className='flex flex-row gap-4 mt-4'>
                { Object.keys(categories).map((singleCategory, index) => <Category key={index} index={index} category={singleCategory} />)}
            </View>

            {/* ONGOING TASKS */}
            <View className='mt-10'>
                <View className='flex flex-row justify-between items-center'>
                    <Text className='font-rubik text-2xl'>Onging Tasks</Text>
                    <TouchableOpacity><Text className='font-rubik text-black-200'>See all</Text></TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Home
