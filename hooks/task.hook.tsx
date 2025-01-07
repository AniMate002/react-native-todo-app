import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ITask } from "@/components/Task";

const TASKS_STORAGE_KEY = "@MyToDoAppKirylShauchenka";

export type ISortTypes = "alphAsc" | "alphDesc" | "dateAsc" | "dateDesc" | "statusAsc" | "statusDesc"; 


export const useTasks = () => {
    const [tasks, setTasks] = useState<Array<ITask>>([]);

    useEffect(() => {
        // AsyncStorage.removeItem(TASKS_STORAGE_KEY)
        loadTasksFromStorage();
    }, []);
    
    const addTask = (task: ITask) => {
        const updatedTasks = [...tasks, task];
        setTasks(updatedTasks);
        saveTasksToStorage(updatedTasks);
    };
    
    // useEffect(() => {
    //   alert("NUmber of tasks: "+ tasks.length)
    // }, [tasks])
      
     // Сохранение задач в AsyncStorage
    const saveTasksToStorage = async (tasks: Array<ITask>) => {
      try {
        const jsonTasks = JSON.stringify(tasks);
        await AsyncStorage.setItem(TASKS_STORAGE_KEY, jsonTasks);
      } catch (error) {
        console.error("Failed to save tasks:", error);
      }
    };
    
    // Загрузка задач из AsyncStorage
    const loadTasksFromStorage = async () => {
      try {
        const jsonTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
        if (jsonTasks) {
          setTasks(JSON.parse(jsonTasks));
        }
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };

    const sortTasks = (sortBy: ISortTypes): Array<ITask> => {
      const comparators: Record<string, (a: ITask, b: ITask) => number> = {
        alph: (a, b) => a.title.localeCompare(b.title),
        date: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        status: (a, b) => a.status.localeCompare(b.status),
      };
    
      const [key, direction] = sortBy.match(/([a-zA-Z]+)(Asc|Desc)/)!.slice(1); // Разбиваем sortBy на ключ и направление
      const multiplier = direction === "Asc" ? 1 : -1;
    
      return [...tasks].sort((a, b) => multiplier * comparators[key](a, b));
    };


    return {tasks, addTask, sortTasks};
}