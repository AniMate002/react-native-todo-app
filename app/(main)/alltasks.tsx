import AllTasks from '@/components/AllTasks/AllTasks'
import SortTasks from '@/components/AllTasks/SortTasks';
import NoTasks from '@/components/NoTasks/NoTasks';
import useBasicStore from '@/store/useBasicStore';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'




// A SCREEN WITH A LIST OF ALL TASKS + SORT PANEL
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
            <NoTasks /> // SHOWING A PANEL WITH CREATE-TASK BUTTON AND A MESSAGE IF USER DOES NOT HAVE ANY TASKS
            :
            <AllTasks tasks={tasks}/>
          }
      </View>
  )
}

export default Alltasks
