import Category from '@/components/Category'
import TaskCard from '@/components/TaskCard'
import icons from '@/constants/icons'
import useMainStore from '@/store/mainStore'
import { categories } from '@/utils/types'
import { Link } from 'expo-router'
import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'

const Home = () => {
    const { getAllUsers, tasks, getTasksByUserId, isLoading } = useMainStore()
    const { authUser } = useMainStore()
    useEffect(() => {
        console.log("update")
        getAllUsers()
        if(authUser){
            getTasksByUserId().then(() => console.log("TASKS:", tasks))
        }
    }, [])
    
    return (
            <FlatList 
            showsVerticalScrollIndicator={false}
            numColumns={1}
            data={tasks}
            className='px-8 pt-10'
            contentContainerClassName='pb-40'
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <TaskCard {...item}/>}
            ListHeaderComponent={(
                <>
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
                    <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName="flex flex-row gap-2 mt-2"
                    data={Object.keys(categories)}
                    renderItem={({item, index}) => <Category category={item} index={index}/>}
                    />


                    {/* ONGOING TASKS */}
                    <View className='mt-10'>
                        <View className='flex flex-row justify-between items-center'>
                            <Text className='font-rubik text-2xl'>Onging Tasks</Text>
                            <TouchableOpacity><Text className='font-rubik text-black-200'>See all</Text></TouchableOpacity>
                        </View>
                        
                    </View>
                </>
            )}
            />
    )
}

export default Home
