import Task, { ITask } from "@/components/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand"

export const TASKS_STORAGE_KEY = "@MyToDoAppKirylShauchenka";


interface BasicState{
  tasks: Array<ITask>,
  loadTasksFromStorage: () => void,
  saveTaskToStorage: (task: ITask) => void,
  clearAllTasks: () => void,
  sortTasks: (sortType: "date" | "status" | "title", order: "asc" | "desc") => void,
  getTaskById: (id: number) => ITask | null,
  deleteTaskById: (id: number) => void,
  changeStatusById: (status: "in progress" | "completed" | "cancelled", id: number) => void,
  getRecentTasks: () => Array<ITask>
}

const useBasicStore = create<BasicState>((set, get) => ({
  tasks: [],
  loadTasksFromStorage: async () => {
    const res = await AsyncStorage.getItem(TASKS_STORAGE_KEY) || "[]"
    set({tasks: JSON.parse(res)})
  },
  saveTaskToStorage: async (task: ITask) => {
    try {
      const currentTasks = get().tasks;
      const updatedTasks = [...currentTasks, task];
      set({tasks: updatedTasks})
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks))
    } catch (error) {
      console.error("Failed to save tasks:", error);
    }
  },
  clearAllTasks: async () => {
    try{
      await AsyncStorage.removeItem(TASKS_STORAGE_KEY)
      set({tasks: []})
    }catch(e){
      console.error("Failed to remove tasks:", e);
    }
  },
  sortTasks: (sortType: "date" | "status" | "title", order: "asc" | "desc") => {
      const index = order === "asc" ? 1 : -1;
      const tasks = [...get().tasks].sort((a, b) => {
        let comparison = 0;
        if(sortType === "date" || sortType === "title" || sortType === "status"){
          comparison = a[sortType].localeCompare(b[sortType])
        }
        return comparison * index;
      })

      set({tasks: tasks})
  },
  getTaskById: (id: number) => {
    const tasks = get().tasks;
    return tasks.find(task => task.id === id) || null
  },
  deleteTaskById: async (id: number) => {
    const tasks = get().tasks;
    const filteredTasks = tasks.filter(task => task.id !== id)
    set({tasks: filteredTasks})
    try{
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(filteredTasks))
    }catch(error){
      console.log("Failed to delete task: ", error  )
    }
  },
  changeStatusById: async (status: "in progress" | "completed" | "cancelled", id: number) => {
    const tasks = get().tasks;
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status } : task
    );
    set({ tasks: updatedTasks });
    try {
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  },
  getRecentTasks: () => {
    const currentTasks = [...get().tasks]
    const sortedTasks = currentTasks.sort((a, b) => b.id - a.id)
    return sortedTasks.slice(0, 5)
  }
}))

export default useBasicStore