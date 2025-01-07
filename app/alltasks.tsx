import AllTasks from '@/components/AllTasks/AllTasks'
import SortTasks from '@/components/AllTasks/SortTasks';
import { ITask } from '@/components/Task';
import { ISortTypes, useTasks } from '@/hooks/task.hook';
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

export const dummyData: Array<ITask> = [
  {
    id: 1,
    title: "Buy groceries",
    description: "Buy fruits, vegetables, and milk from the store.",
    status: "in progress",
    date: (new Date()).toLocaleString(), // Current date as string
    location: "Supermarket",
  },
  {
    id: 2,
    title: "Complete React profewfewfewfewfewfject",
    description: "Finish the tasks for the React application by the end of the day.",
    status: "not started",
    date: (new Date()).toLocaleString(), // Current date as string
    location: "Home",
  },
];




const Alltasks = () => {

  const { tasks, sortTasks } = useTasks()
  const [sortBy, setSortBy] = useState<ISortTypes>("dateAsc")

  
  

  useEffect(() => {
    sortTasks(sortBy);
    alert("Sorting: "  + sortBy)
  }, [sortBy])

  return (
      <View className='w-screen bg-white h-full mt-[10px] rounded-t-[40px] pt-[20px] px-[10px]'>
          {/* SORT COMPONENT */}
          <SortTasks sortBy={sortBy} setSortBy={setSortBy}/>
          {/* ALL TASKS */}
          <AllTasks tasks={dummyData}/>
      </View>
  )
}

export default Alltasks
