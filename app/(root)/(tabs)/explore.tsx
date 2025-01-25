import NoResult from '@/components/NoResult'
import TaskCard from '@/components/TaskCard'
import icons from '@/constants/icons'
import useMainStore from '@/store/mainStore'
import { categories, ITask } from '@/utils/types'
import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity, TextInput, Alert, SafeAreaView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import ThemeChangeButton from '@/components/ThemeChangeButton'
import Header from '@/components/Header'
import SearchForm from '@/components/SearchForm'
import { router } from 'expo-router'

const Explore = () => {
    const { tasks, getTasksByUserId, isLoading } = useMainStore()
    // LOCATION QUERY
    const [location, setLocation] = useState<keyof typeof categories | string>("")
    // SEARCH QUERY
    const [searchQuery, setSearchQuery] = useState<string>("")

    // PICKER STATE
    const [sortType, setSortType] = useState<"dueDate" | "title" | "status" | "timeStamp">("timeStamp");

    useEffect(() => {
        getTasksByUserId()
    }, [])



   const filteredTasks = useMemo(() => {
    // FILTERING
    let filtered = tasks.filter((task) => {
        const matchesLocation = location ? task.location === location : true;
        const matchesSearchQuery = searchQuery
            ? task.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
            : true;
        return matchesLocation && matchesSearchQuery;
    });

    // SORTING
    if (sortType) {
        filtered.sort((a, b) => {
            if (sortType === 'title') {
                return a.title.localeCompare(b.title);
            } else if (sortType === 'dueDate') {
                return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            } else if (sortType === 'status') {
                return a.status.localeCompare(b.status); 
            }else if (sortType === 'timeStamp'){
                return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
            }
            return 0;
        });
    }

    return filtered;
}, [tasks, location, searchQuery, sortType]);

    return (
        <View className='dark:bg-[#111111] h-full'>
            <SafeAreaView />
            <FlatList 
                    data={filteredTasks}
                    className='px-8'
                    contentContainerClassName='pb-40'
                    keyExtractor={(item) => item.id}
                    renderItem={({item, index}) => <TaskCard {...item}/>}
                    ListEmptyComponent={
                        isLoading 
                        ?
                        <ActivityIndicator size={"large"}/>
                        :
                        <NoResult />
                    }
                    ListHeaderComponent={
                        <View>
                            {/* HEADER */}
                            <Header title='Search for Your Tasks' customArrowButtonHandler={() => router.back()}/>

                            {/* SEARCH */}
                            <SearchForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSortType={setSortType} sortType={sortType}/>

                            

                            {/* TPYE/LOCATION */}
                            <FlatList 
                                data={Object.keys(categories)}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerClassName='flex flex-row gap-2 mt-4'
                                renderItem={({item, index}) => (
                                    <TouchableOpacity 
                                    onPress={() => setLocation(item === location ? "" : item)}
                                    key={index} 
                                    className={`${item === location ? "bg-emerald-500" : "bg-[#EBEBEB] dark:bg-[#414440]"} px-12 py-4 rounded-full`}>
                                            <Text className={`${item === location ? "font-rubik-medium text-white" : "font-rubik text-black-300 dark:text-white"}`}>{item}</Text>
                                        </TouchableOpacity>
                                )}
                            />
                        </View>
                    }
                    />
        </View>
        
    )
}

export default Explore
