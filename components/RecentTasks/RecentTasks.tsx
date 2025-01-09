import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import Task, { ITask } from '../Task'
import NoTasks from '../NoTasks/NoTasks'

export interface IRecentTasks {
    tasks: Array<ITask>
}

const RecentTasks:React.FC<IRecentTasks> = ({ tasks }) => {
    const renderedTasks = tasks.map(task => <Task key={task.id} {...task}/>)
    return (
        <View className='w-screen bg-white h-[51%]  mt-[10px] rounded-t-[40px]'>
            <Text className='mt-[20px] text-xl font-semibold ml-[30px]'>Recent Tasks</Text>
            {/* RENDERING ALL TASKS */}
            {
                tasks.length > 0
                ?
                <ScrollView 
                contentContainerStyle={{flexGrow: 1, gap: 10, paddingHorizontal: 10}}
                keyboardShouldPersistTaps="handled"
                className='mt-[10px]'>
                    { renderedTasks }
                </ScrollView>
                :
                <NoTasks /> //OTHERWISE DISPLAY SPECIAL COMPONENT
            }
        </View>
    )
}

export default RecentTasks
