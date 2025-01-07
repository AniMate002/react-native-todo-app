import { Text, View, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, ScrollView } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import Task, { ITask } from "@/components/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { measure } from "react-native-reanimated";
import TasksList from "@/components/TasksList";
import DateComponent from "@/components/Date/Date";
import TodaysTasks from "@/components/TodaysTasks/TodaysTasks";
import useBasicStore from "@/store/useBasicStore";






export default function Index() {

  const [recentTasks, setRecentTasks] = useState<Array<ITask>>([])
  const { getRecentTasks } = useBasicStore()
  useEffect(() => {
    setRecentTasks(getRecentTasks())
  }, [])

  return (
    <View className="w-screen h-screen ">

      {/* Date Info */}
      <DateComponent />
      {/* Todays tasks */}
      <TodaysTasks tasks={recentTasks}/>

      {/* Tasks Wrapper */}
      
      {/* <View className="pt-[80px] px-[20px]"> */}
        {/* Todays tasks */}
        {/* <Text className=" text-3xl font-bold">Today's Tasks</Text> */}
        {/* Tasks list */}
        {/* <TasksList tasks={tasks}/> */}
      {/* </View> */}


      {/* Adding a new task */}
      {/* <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      className="absolute bottom-[80px] left-0 flex items-center justify-between flex-row w-full px-[20px]">

        <TextInput
        value={task}
        onChangeText={text => setTask(text)} 
        className=" bottom-0 left-0 p-[15px] bg-white rounded-xl w-[250px] border-[1px] border-[#C0C0C0]" placeholder="Write a task..."/>

        <TouchableOpacity onPress={handleAddTask}>
          <View className="h-[60px] w-[60px] bg-white flex items-center justify-center rounded-full border-[1px] border-[#C0C0C0]">
            <Text className="">+</Text>
          </View>
        </TouchableOpacity>

      </KeyboardAvoidingView> */}
    </View>
  );
}