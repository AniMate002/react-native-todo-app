import AllTasks from '@/components/AllTasks/AllTasks'
import SortTasks from '@/components/AllTasks/SortTasks';
import NoTasks from '@/components/NoTasks/NoTasks';
import { ITask } from '@/components/Task';
import useBasicStore from '@/store/useBasicStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'





const Alltasks = () => {
  const [sortBy, setSortBy] = useState("dateAsc")

  const { tasks, loadTasksFromStorage, clearAllTasks} = useBasicStore((state) => state)
  
  useEffect(() => {
    // clearAllTasks()
    loadTasksFromStorage()
  }, [])
  

  return (
      <View className='w-screen bg-white h-full mt-[10px] rounded-t-[40px] pt-[20px] px-[10px]'>
          {/* SORT COMPONENT */}
          <SortTasks/>
          {/* ALL TASKS */}
          {
            tasks?.length === 0
            ?
            <NoTasks />
            :
            <AllTasks tasks={tasks}/>
          }
      </View>
  )
}

export default Alltasks
