import Category from '@/components/Category'
import TaskCard from '@/components/TaskCard'
import icons from '@/constants/icons'
import useMainStore from '@/store/mainStore'
import { categories, ITask } from '@/utils/types'
import { Feather } from '@expo/vector-icons'
import { Link, router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, ActivityIndicator, FlatList, StatusBar } from 'react-native'
import ThemeChangeButton from '@/components/ThemeChangeButton'
// NATIVE NOTIFY
import registerNNPushToken from 'native-notify';
import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes, cancelAllScheduledNotificationsAsync } from 'expo-notifications'
import { createScheduledPushNotification } from '@/utils/pushNotifications'
import SearchForm from '@/components/SearchForm'
import NoResult from '@/components/NoResult'
import { useColorScheme } from 'nativewind'


const Home = () => {
    // NATIVE NOTIFY HOOK
    registerNNPushToken(26754, 'Dw62JOEMRHVESUWpXGOO15');

    const { getAllUsers, tasks, getTasksByUserId, isLoading, clearAllStorage } = useMainStore()
    const { authUser } = useMainStore()

    // COLOR SCHEME
    const { colorScheme } = useColorScheme()

    // SEARCH QUERY
    const [searchQuery, setSearchQuery] = useState<string>("")

    // SORT TYPE
    const [sortType, setSortType] = useState<"dueDate" | "title" | "status" | "timeStamp">("timeStamp");

    // FILTERED TASKS
    const [filteredTasks, setFilteredTasks] = useState<Array<ITask>>([])
    
    // FETCHING TASKS ON MOUNT
    useEffect(() => {
        // clearAllStorage()
        // cancelAllScheduledNotificationsAsync()
        // console.log("ALL NOTIFICATIONS CANCELLED")
        getAllUsers()
        if(authUser){
            getTasksByUserId().then(() => console.log("TASKS:", tasks))
        }
    }, [])

    // SETTING ONGOING TASKS AFTER FETCHING ALL TASKS
    useEffect(() => {
        if(tasks && !isLoading)
            setFilteredTasks(tasks)
    }, [tasks])

    // UPDATING FILTERED TASKS WHEN CHANGING SEARCH QUERY OR SORT TYPE
    useEffect(() => {
        let updatedTasks = tasks;

        // SEARCH QUERY
        if (searchQuery) {
            updatedTasks = updatedTasks.filter(task =>
                task.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
            );
        }

        // SORT TYPE
        if (sortType) {
            updatedTasks = [...updatedTasks].sort((a, b) => {
                if (sortType === 'dueDate') {
                    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                } else if (sortType === 'title') {
                    return a.title.localeCompare(b.title);
                } else if (sortType === 'status') {
                    return a.status.localeCompare(b.status);
                } else if (sortType === 'timeStamp'){
                    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
                }
                return 0;
            });
        }

        setFilteredTasks(updatedTasks);
    }, [sortType, searchQuery, tasks])
    
    
    return (
        <View className='h-full dark:bg-[#111111]'>
            <StatusBar
                barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={colorScheme === 'dark' ? '#111111' : "#f5f5f5"}
            />
            <SafeAreaView />
            <FlatList 
            showsVerticalScrollIndicator={false}
            numColumns={1}
            data={filteredTasks}
            className='px-8'
            contentContainerClassName='pb-40'
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <TaskCard {...item}/>}
            ListEmptyComponent={
                isLoading 
                ?
                <ActivityIndicator size={"large"}/>
                :
                <NoResult />
            }
            ListHeaderComponent={(
                <>
                    {/* HEADER */}
                    <View className='flex flex-row items-center justify-between'>
                        <View>
                            <Text className='font-semibold text-3xl mt-6 text-black-300 dark:text-white'>Hi, {authUser?.name}</Text>
                            <Text className='text-black-100 mt-2'>{tasks?.length < 10 ? "0" + tasks?.length : tasks?.length} task pending</Text>
                        </View>
                        <ThemeChangeButton />
                    </View>


                    {/* SEARCH */}
                    <SearchForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSortType={setSortType} sortType={sortType}/>

                    {/* CATEGORIES (SHOW ONLY WHEN SEARCH QUERY EMPTY)*/}
                    {
                        !searchQuery
                        ?
                        <>
                            <Text className='font-rubik text-black-300 dark:text-white text-2xl mt-10'>Categories</Text>
                            <FlatList 
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerClassName="flex flex-row gap-2 mt-2"
                            data={Object.keys(categories)}
                            renderItem={({item, index}) => <Category category={item} index={index}/>}
                            />
                        </>
                        :
                        ""
                    }


                    {/* ONGOING TASKS */}
                    <View className='mt-10'>
                        <View className='flex flex-row justify-between items-center'>
                            <Text className='font-rubik text-2xl text-black-300 dark:text-white'>{searchQuery ? "Search Tasks " + filteredTasks?.length + " Results" : "Recent Tasks"}</Text>
                            <TouchableOpacity onPress={() => router.navigate("/explore")}><Text className='font-rubik text-black-200'>See all</Text></TouchableOpacity>
                        </View>
                        
                    </View>
                </>
            )}
            />
        </View>
    )
}

export default Home
