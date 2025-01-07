import { ITask } from '@/components/Task';
import useBasicStore from '@/store/useBasicStore';
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Modal } from 'react-native'
import DatePicker from 'react-native-modern-datepicker';


const Addtask = () => {
    const router = useRouter()
    const [showCalendar, setShowCalendar] = useState(false)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")

    const { tasks, loadTasksFromStorage, saveTaskToStorage} = useBasicStore(state => state)


    const handleAddTask = async () => {
        if(!title.trim()) return alert("Title is required!")
        saveTaskToStorage({id: tasks.length || 0, title: title.trim(), description: description.trim(), date, location: location.trim(), status: "in progress"})
        router.dismiss()
    }


    return (
        <View className='p-[20px] flex h-full justify-between'>
            <View>
                {/* Navigation */}
                <TouchableOpacity 
                onPress={() => router.back()}
                className=''
                >
                    <Text className='text-blue-500 font-semibold'>&larr; Create Task</Text>
                </TouchableOpacity>

                {/* Title */}
                <TextInput 
                value={title}
                onChangeText={text => setTitle(text)}
                placeholder='Title...' 
                className='mt-[50px] text-[33px]'/>
                
                {/* Date and Time Button*/}
                <TouchableOpacity
                // SHOW CALENDAR MODAL WINDOW
                onPress={() =>setShowCalendar(true)} 
                className='mt-[20px]'
                >
                    <Text className='text-blue-400'>{date || "Choose date and time..."}</Text>
                </TouchableOpacity>

                {/* Date and Time modal */}
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={showCalendar}
                    onRequestClose={() => setShowCalendar(false)} // Ensure modal can be closed on Android by pressing hardware back button
                    
                >
                    <View className="flex-1 justify-center items-center bg-opacity-50 flex-col">
                        <View className='w-[90%] bg-white rounded-xl p-[10px] flex items-center justify-center'>
                            {/* DATE PICKER */}
                            <DatePicker 
                            onSelectedChange={date => setDate(date)}
                            mode='datepicker' 
                            />
                            <View className='flex items-end justify-center flex-row gap-4'>
                            {/* CLOSE MODAL BUTTON */}
                                <TouchableOpacity
                                onPress={() => setShowCalendar(false)}
                                className='bg-blue-500 w-[100px] h-[30px] rounded-lg flex items-center justify-center'
                                >
                                    <Text className='text-white font-semibold '>Close</Text>
                                </TouchableOpacity>
                            {/* SELECT DATE BUTTON */}
                                <TouchableOpacity
                                onPress={() => setShowCalendar(false)}
                                className='bg-blue-500 w-[100px] h-[30px] rounded-lg flex items-center justify-center'
                                >
                                    <Text className='text-white font-semibold '>Select</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* Description */}
                <Text className='mt-[50px] mb-2 text-lg'>Description:</Text>
                <TextInput 
                value={description}
                onChangeText={text => setDescription(text)}
                placeholder='Note something down...' 
                className=' text-[16px] border-b-2 border-blue-200'/>


                {/* Location */}
                <Text className='mt-[50px] mb-2 text-lg'>Location:</Text>
                <TextInput 
                value={location}
                onChangeText={text => setLocation(text)}
                placeholder='Choose the location...' 
                className='text-[16px] border-b-2 border-blue-200'/>
            </View>

            {/* Submit Button */}
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            >
                <TouchableOpacity
                onPress={handleAddTask}
                >
                    <Text className='bg-blue-500 mb-[60px] relative uppercase font-semibold text-lg text-white rounded-xl py-[10px] text-center'>Create task</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </View>
    )
}

export default Addtask
