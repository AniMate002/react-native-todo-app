import icons from '@/constants/icons'
import React, { useRef, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Platform } from 'react-native'
import {Picker} from '@react-native-picker/picker';


interface SearchFormProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    setSortType: React.Dispatch<React.SetStateAction<"title" | "dueDate" | "status" | "timeStamp">>;
    sortType: "title" | "dueDate" | "status" | "timeStamp"
}

const SearchForm:React.FC<SearchFormProps> = ({searchQuery, setSearchQuery, setSortType, sortType}) => {
        const [showSortPicker, setShowSortPicker] = useState<boolean>(false)
        const pickerRef = useRef<any>()
        function open() {
            if(pickerRef.current)
            pickerRef.current.focus();
        }
          
        function close() {
            if(pickerRef.current)
            pickerRef.current.blur();
        }

        const handleShowPicker = () => {
            if(Platform.OS === "ios"){
                setShowSortPicker(prev => !prev)
            }else{
                open()
            }
        }
    
    return (
        <>
            <View className='flex flex-row items-center justify-between mt-8'>
                <View className='flex items-center flex-row bg-[#EBEBEB] dark:bg-[#212622] rounded-full px-4 py-2 w-3/4'>
                    <TouchableOpacity>
                        <Image source={icons.search} className='size-8'/>
                    </TouchableOpacity>
                    <TextInput 
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                    placeholder='Search' 
                    className='text-2xl placeholder:text-gray-400 p-4 w-full text-black-300 dark:text-white'/>
                </View>

                <TouchableOpacity onPress={handleShowPicker}>
                    <View className='bg-black-300 dark:bg-[#212622] rounded-full p-4'>
                        <Image source={icons.filter} className='size-8'/>
                    </View>
                </TouchableOpacity>


            </View>
            {/* SORT TYPE PICKER FOR IPHONE*/}
            {
                Platform.OS === "ios"
                ?
                <Picker
                style={{margin: 0, marginTop: -40, padding: 0, height: 150, display: showSortPicker ? "flex" : "none"}}
                itemStyle={{fontSize: 16}}
                selectedValue={sortType}
                mode='dialog'
                onValueChange={(itemValue, itemIndex) =>
                    setSortType(itemValue)
                }>
                    <Picker.Item label='Sort by:' value={'timeStamp'}/>
                    <Picker.Item label="Title" value="title" />
                    <Picker.Item label="Due Date" value="dueDate" />
                    <Picker.Item label="Status" value="status" />
                </Picker>
                :
                <Picker
                ref={pickerRef}
                selectedValue={sortType}
                style={{display: "none"}}
                prompt='Sort by:'
                onValueChange={(itemValue, itemIndex) =>
                    setSortType(itemValue)
                }>
                    <Picker.Item label='Timestamp' value={'timeStamp'}/>
                    <Picker.Item label="Title" value="title" />
                    <Picker.Item label="Due Date" value="dueDate" />
                    <Picker.Item label="Status" value="status" />
                </Picker>
            }
        </>
    )
}

export default SearchForm
