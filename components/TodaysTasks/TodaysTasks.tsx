import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import Task, { ITask } from '../Task'

export interface ITodaysTasks {
    tasks: Array<ITask>
}

const TodaysTasks:React.FC<ITodaysTasks> = ({ tasks }) => {
    const renderedTasks = tasks.map(task => <Task key={task.id} {...task}/>)
    return (
        <View className='w-screen bg-white h-full mt-[10px] rounded-t-[40px]'>
            <Text className='mt-[20px] text-xl font-semibold ml-[30px]'>Recent Tasks</Text>

            <ScrollView 
            contentContainerStyle={{flexGrow: 1, gap: 10, paddingHorizontal: 10}}
            keyboardShouldPersistTaps="handled"
            className='mt-[10px]'>
                { renderedTasks }
            </ScrollView>
        </View>
    )
}

export default TodaysTasks
