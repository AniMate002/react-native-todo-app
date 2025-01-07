import React, { useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Task, { ITask } from '../Task'

export interface IAllTasks {
    tasks: Array<ITask>
}

const AllTasks:React.FC<IAllTasks> = ({ tasks }) => {
    let renderedTasks = tasks?.map(task => <Task key={task.id} {...task}/>);

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
