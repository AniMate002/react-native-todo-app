import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import Task, { ITask } from './Task'

export interface ITasksList {
    tasks: Array<ITask>
}

const TasksList:React.FC<ITasksList> = ({tasks}) => {
    return (
        <ScrollView 
        contentContainerStyle={{flexGrow: 1, gap: 10}}
        keyboardShouldPersistTaps="handled"
        className="mt-20 flex flex-col gap-4 h-[60vh] overflow-y-auto">
            {
                tasks.map((task, index) => <Task key={index} {...task}/>)
            }
        </ScrollView>
    )
}

export default TasksList
