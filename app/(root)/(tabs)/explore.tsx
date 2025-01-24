import NoResult from '@/components/NoResult'
import TaskCard from '@/components/TaskCard'
import icons from '@/constants/icons'
import useMainStore from '@/store/mainStore'
import { categories, ITask } from '@/utils/types'
import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons'

const Explore = () => {
    const { tasks, getTasksByUserId, isLoading } = useMainStore()
    // LOCATION QUERY
    const [location, setLocation] = useState<keyof typeof categories | string>("")
    // SEARCH QUERY
    const [searchQuery, setSearchQuery] = useState<string>("")

    // PICKER STATE
    const [sortType, setSortType] = useState<"dueDate" | "title" | "status" | null>(null);
    const [showDatePicker, setShoDatePicker] = useState<boolean>(false)

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
            }
            return 0;
        });
    }

    return filtered;
}, [tasks, location, searchQuery, sortType]);

    return (
        <FlatList 
        data={filteredTasks}
        className='px-8 pt-10'
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
                <View className='flex items-center flex-row mt-4'>
                    <View className='flex items-center justify-center size-16 bg-[#EBEBEB] rounded-full'>
                        <Image source={icons.backArrow} className='size-6'/>
                    </View>
                    <Text className='font-rubik-medium ml-auto mr-auto'>Search For Your Tasks</Text>
                    <Image source={icons.bell} className='size-6'/>
                </View>

                {/* SEARCH */}
                <View className='flex flex-row items-center justify-between mt-8'>
                    <View className='flex items-center flex-row bg-[#EBEBEB] rounded-full px-4 py-2 w-3/4'>
                        <TouchableOpacity>
                            <Image source={icons.search} className='size-8'/>
                        </TouchableOpacity>
                        <TextInput 
                        value={searchQuery}
                        onChangeText={text => setSearchQuery(text)}
                        placeholder='Search' 
                        className='text-2xl p-4 w-full'/>
                    </View>

                    <TouchableOpacity onPress={() => setShoDatePicker(prev => !prev)}>
                        <View className='bg-black-300 rounded-full p-4'>
                            <Image source={icons.filter} className='size-8'/>
                        </View>
                    </TouchableOpacity>

                </View>
                    <Picker
                    style={{margin: 0, marginTop: -40, padding: 0, height: 150, display: showDatePicker ? "flex" : "none"}}
                    itemStyle={{fontSize: 16}}
                    selectedValue={sortType}
                    mode='dialog'
                    onValueChange={(itemValue, itemIndex) =>
                        setSortType(itemValue)
                    }>
                        <Picker.Item label='Sort by:' value={null}/>
                        <Picker.Item label="Title" value="title" />
                        <Picker.Item label="Due Date" value="dueDate" />
                        <Picker.Item label="Status" value="status" />
                    </Picker>

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
                        className={`${item === location ? "bg-emerald-500" : "bg-[#EBEBEB]"} px-12 py-4 rounded-full`}>
                                <Text className={`${item === location ? "font-rubik-medium text-white" : "font-rubik text-black-300"}`}>{item}</Text>
                            </TouchableOpacity>
                    )}
                    />
            </View>
        }
        />
    )
}

export default Explore
