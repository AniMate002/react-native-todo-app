import { View} from "react-native";
import { useEffect, useState } from "react";
import { ITask } from "@/components/Task";
import DateComponent from "@/components/Date/Date";
import RecentTasks from "@/components/RecentTasks/RecentTasks";
import useBasicStore from "@/store/useBasicStore";

// THE FIRST SCREEN THAT USER SEES
export default function Index() {
  // STATE FOR recentTasks
  const [recentTasks, setRecentTasks] = useState<Array<ITask>>([])
  const { tasks, loadTasksFromStorage} = useBasicStore()

  // RETURNS 5 RECENT TASKS FROM STORE
  const createRecentTasks = (tasks: Array<ITask>) => [...tasks].sort((a, b) => b.id - a.id).slice(0, 5)
  
  // LOADING ALL TASKS FROM STORAGE TO STORE
  useEffect(() => {
    loadTasksFromStorage()
  }, [])

  // GENERATING RECENT TASKS IF THEY EXIST
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