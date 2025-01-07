import React, { useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Task, { ITask } from '../Task'
import { useTasks } from '@/hooks/task.hook'

export interface IAllTasks {
    tasks: Array<ITask>
}

const AllTasks:React.FC<IAllTasks> = ({ }) => {
    const { tasks } = useTasks()
    let renderedTasks = tasks?.map(task => <Task key={task.id} {...task}/>);
    // let renderedTasks;
    useEffect(() => {
        // renderedTasks = tasks?.map(task => <Task key={task.id} {...task}/>)
        alert("Tasks: " + tasks.length)
    }, [tasks])

    return (
        <ScrollView 
        contentContainerStyle={{flexGrow: 1, gap: 10, paddingHorizontal: 10}}
        keyboardShouldPersistTaps="handled"
        className='pt-[20px]'
        >
            { renderedTasks }
        </ScrollView>
    )
}

export default AllTasks
