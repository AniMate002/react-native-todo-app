import AddTaskNavigation from '@/components/AddTask/AddTaskNavigation';
import ModalCalendar from '@/components/AddTask/ModalCalendar';
import useBasicStore from '@/store/useBasicStore';
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native'


const Addtask = () => {
    const router = useRouter()
    const [showCalendar, setShowCalendar] = useState(false)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")

    const { tasks, loadTasksFromStorage, saveTaskToStorage} = useBasicStore(state => state)


    const handleAddTask = async () => {
        // THE ONLY REQUIREMENT TO CREATE A TASK IS TO PRIVDE TITLE
        if(!title.trim()) return alert("Title is required!")
        // SAVING TASK TO STORE AND ASYNCSTORAGE
        saveTaskToStorage({id: tasks.length || 0, title: title.trim(), description: description.trim(), date, location: location.trim(), status: "in progress"})
        // CLOSING THIS MODAL SCREEN
        router.dismiss()
    }
    return (
        <View className='p-[20px] flex h-full justify-between'>
            <View>
                {/* NAVIGATION */}
                <AddTaskNavigation />

                {/* Title */}
                <TextInput 
                value={title}
                onChangeText={text => setTitle(text)}
                placeholder='Title...' 
                className='mt-[50px] text-[33px]'/>
                
                {/* SHOW CALENDAR BUTTON */}
                <TouchableOpacity
                onPress={() =>setShowCalendar(true)} 
                className='mt-[40px]'
                >
                    <Text className='text-blue-400 text-xl'>{date || "Choose date and time..."}</Text>
                </TouchableOpacity>

                {/* Date and Time modal */}
                <ModalCalendar setDate={setDate} showCalendar={showCalendar} setShowCalendar={setShowCalendar}/>

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
