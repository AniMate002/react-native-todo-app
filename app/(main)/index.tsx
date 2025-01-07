import { Text, View, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, ScrollView } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import Task, { ITask } from "@/components/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { measure } from "react-native-reanimated";
import TasksList from "@/components/TasksList";
import DateComponent from "@/components/Date/Date";
import RecentTasks from "@/components/RecentTasks/RecentTasks";
import useBasicStore from "@/store/useBasicStore";






export default function Index() {

  const [recentTasks, setRecentTasks] = useState<Array<ITask>>([])
  const { tasks, loadTasksFromStorage} = useBasicStore()

  const createRecentTasks = (tasks: Array<ITask>) => [...tasks].sort((a, b) => b.id - a.id)
  
  useEffect(() => {
    loadTasksFromStorage()
  }, [])

  useEffect(() => {
    if(tasks.length > 0) setRecentTasks(createRecentTasks(tasks))
  }, [tasks])


  return (
    <View className="w-screen h-screen ">

      {/* Date Info */}
      <DateComponent />
      {/* RecentTasks */}
      <RecentTasks tasks={recentTasks}/>

    </View>
  );
}