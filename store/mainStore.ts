import { ILog, ITask, IUser, StatusType } from '@/utils/types';
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS } from '@/utils/keys';
import { createScheduledPushNotification } from '@/utils/pushNotifications';


interface MainStoreI {
    allUsers: Array<IUser>;
    authUser: IUser | null;
    tasks: Array<ITask>;
    currentTask: ITask | null;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    logs: Array<ILog>;
    getAllUsers: () => void;
    getAuthUser: () => Promise<void>;
    createUser: (name: string) => void;
    createNewTask: (task: ITask) => void;
    getTasksByUserId: () => Promise<void>;
    getTaskById: (id: string) => Promise<void>;
    changeTaskStatusById: (id: string, status: StatusType) => Promise<void>;
    updateAvatar: (avatar: string) => Promise<void>;
    getLogsFromStorage: () => Promise<void>;
    deleteTaskById: (id: string) => Promise<void>;
    clearAllStorage: () => Promise<void>;
    logout: () => Promise<void>;
}

const useMainStore = create<MainStoreI>((set, get) => ({
    allUsers: [],
    authUser: null,
    tasks:[],
    currentTask: null,
    isLoading: false,
    isError: false,
    error: null,
    logs: [],
    getAllUsers: async () => {
        try {
            set({isLoading: true})
            const res = await fetch("https://json-server-todo-react-native.vercel.app/users")
            const data = await res.json()
            set({allUsers: data, error: null, isError: false})
        } catch (error) {
            console.log(error)
            set({isError: true, error: error as Error })
        }finally{
            set({isLoading: false})
        }
        
        console.log("ALL USERS IN STORE:", get().allUsers)
    },
    getAuthUser: async () => {
        try {
            set({isLoading: true})
            const userFromStore = JSON.parse(await AsyncStorage.getItem(KEYS.storageKey) || "") as IUser
            if(!userFromStore){
                set({authUser: null, error: null, isError: false})
                return
            }

            const res = await fetch("https://json-server-todo-react-native.vercel.app/users/" + userFromStore?.id)
            const userFromDatabase = await res.json()
            if(!userFromDatabase){
                set({authUser: null, error: null, isError: false})
                return
            }

            set({authUser: userFromStore, error: null, isError: false})
            console.log("USER FROM DATABASE: ", userFromDatabase)
            console.log("USER FROM STORAGE: ", userFromStore)
        } catch (error) {
            console.log(error)
            set({isError: true, error: error as Error })
        }finally{
            set({isLoading: false})
        }
    },
    createUser: async (name: string) => {
        try {
            set({isLoading: true})
            if(!name) return
            const id = uuidv4()
            const avatar = "https://avatar.iran.liara.run/public/8"
            const res = await fetch("https://json-server-todo-react-native.vercel.app/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, id, avatar })
            });

            await AsyncStorage.setItem(KEYS.storageKey, JSON.stringify({name, id, avatar}))

            set({authUser: {name, id, avatar}, error: null, isError: false})
            console.log("AUTH USER STORE:", get().authUser)
        } catch (error) {
            console.log(error)
            set({isError: true, error: error as Error })
        }finally{
            set({isLoading: false})
        }
    },
    getTasksByUserId: async () => {
        try {
            set({isLoading: true})
            if(!get().authUser?.id) return
            const resServer = await fetch(`https://json-server-todo-react-native.vercel.app/tasks/personId=${get().authUser?.id}`)
            const dataServer = await resServer.json()
            const res = await AsyncStorage.getItem(KEYS.storageKeyTasks)
            if(!res) return 
            const data = JSON.parse(res) as Array<ITask>
            set({tasks: data, error: null, isError: false})
        } catch (error) {
            console.log(error)
            set({isError: true, error: error as Error })
        }finally{
            set({isLoading: false})
        }
        
        console.log("ALL TASKS BY AUTH USER:", get().tasks)
    },
    createNewTask: async (task: ITask) => {
        try {
            set({isLoading: true})
            if(!task || !task.title) throw new Error("Task title is required")
            if(!get().authUser?.id) throw new Error("User is not authenticated")
            const id = uuidv4()
            const res = await fetch("https://json-server-todo-react-native.vercel.app/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...task, id })
            });
            const newLog: ILog = {timestamp: new Date(), type: 'task created', taskId: id} 

            await AsyncStorage.setItem(KEYS.storageKeyTasks, JSON.stringify([...get().tasks, {...task, id}]))

            const data = await res.json()
            set({tasks: [...get().tasks, data], error: null, isError: false, logs: [...get().logs, newLog]})  

            // CREATE PUSH NOTIFICATION
            await createScheduledPushNotification(task.dueDate)

            const oldLogsStr = await AsyncStorage.getItem(KEYS.storageKeyLogs)
            const oldLogs = JSON.parse(oldLogsStr || "[]")
            await AsyncStorage.setItem(KEYS.storageKeyLogs, JSON.stringify([...oldLogs, newLog]))
        } catch (error) {
            console.log(error)
            set({isError: true, error: error as Error })
        }finally{
            set({isLoading: false})
        }
        console.log("ALL TASKS IN STORE:", get().tasks)
    },
    getTaskById: async (id: string) => {
        try {
            set({isLoading: true})
            const task = get().tasks.find(task => task.id === id)
            if(!task) throw new Error("Task with this id not found.")
            set({currentTask: task, isError: false, error: null})
        } catch (error) {
            console.log(error)
            set({isError: true, error: error as Error })
        }finally{
            set({isLoading: false})
        }
    },
    changeTaskStatusById: async (id: string, status: StatusType) => {
        try{
            set({isLoading: true})

            const updatedTasks = get().tasks.map((task) => {
                if(task.id === id){
                    return {...task, status}
                }else{
                    return task
                }
            })

            set({tasks: updatedTasks})

            const updatedTask = updatedTasks.find(task => task.id === id)

            await AsyncStorage.setItem(KEYS.storageKeyTasks, JSON.stringify(updatedTasks))
            const res = await fetch(`https://json-server-todo-react-native.vercel.app/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedTask)
            });
            const data = await res.json()
            console.log("UPDATED TASK SEND TO DB")

            const newLog: ILog = {timestamp: new Date(), type: 'changed status', taskId: id, status} 



            set({currentTask: updatedTask, error: null, isError: false, logs: [...get().logs, newLog]})
            const oldLogsStr = await AsyncStorage.getItem(KEYS.storageKeyLogs)
            const oldLogs = JSON.parse(oldLogsStr || "[]")
            await AsyncStorage.setItem(KEYS.storageKeyLogs, JSON.stringify([...oldLogs, newLog]))

            
        }catch (error) {
            console.log(error)
            set({isError: true, error: error as Error })
        }finally{
            set({isLoading: false})
        }
    },
    updateAvatar: async (avatar) => {
        try{
            set({isLoading: true})
            const updatedUser = {...get().authUser, avatar} as IUser
            await AsyncStorage.setItem(KEYS.storageKey, JSON.stringify(updatedUser))
            await fetch(`https://json-server-todo-react-native.vercel.app/users/${get().authUser?.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedUser)
            });
            console.log("UPDATED USER SEND TO DB")

            const newLog: ILog = {timestamp: new Date(), type: 'updated avatar'} 
            
            
            set({authUser: updatedUser, isError: false, error: null, logs: [...get().logs, newLog]})
            const oldLogsStr = await AsyncStorage.getItem(KEYS.storageKeyLogs)
            const oldLogs = JSON.parse(oldLogsStr || "[]")
            await AsyncStorage.setItem(KEYS.storageKeyLogs, JSON.stringify([...oldLogs, newLog]))
        }catch (error) {
            console.log(error)
            set({isError: true, error: error as Error })
        }finally{
            set({isLoading: false})
        }
    },
    getLogsFromStorage: async () => {
        try {
            const logsStr = await AsyncStorage.getItem(KEYS.storageKeyLogs)
            if(!logsStr) return
            const logs = JSON.parse(logsStr)
            set({logs, isError: false, error: null})
            console.log("LOGS: ", logs)
        } catch (error) {
            console.log(error)
            set({isError: true, error: error as Error })
        }finally{
            set({isLoading: false})
        }
    },
    deleteTaskById: async (id: string) => {
        try{
            set({isLoading: true})
            const updatedTasks = get().tasks.filter(task => task.id !== id)
            await AsyncStorage.setItem(KEYS.storageKeyTasks, JSON.stringify(updatedTasks))
            const res = await fetch(`https://json-server-todo-react-native.vercel.app/tasks/${id}`, {
                method: "DELETE"
            })
            const data = await res.json()
            console.log("DELTETIng DATA FROM SERVER: ", data)
            set({tasks: updatedTasks, isError: false, error: null})


            const newLog: ILog = {timestamp: new Date(), type: 'task deleted'} 

            const oldLogsStr = await AsyncStorage.getItem(KEYS.storageKeyLogs)
            const oldLogs = JSON.parse(oldLogsStr || "[]")
            await AsyncStorage.setItem(KEYS.storageKeyLogs, JSON.stringify([...oldLogs, newLog]))
        }catch (error) {
            console.log(error)
            set({isError: true, error: error as Error })
        }finally{
            set({isLoading: false})
        }
    },
    clearAllStorage: async () => {
        await AsyncStorage.clear()
    },
    logout: async () => {
        try{
            set({isLoading: true})
            await AsyncStorage.clear()
            set({currentTask: null, authUser: null, tasks: [], logs: [], allUsers: [], isError: false, error: null})
            console.log("LOGOUT SUCCESSFULLY")
        }catch (error) {
            console.log(error)
            set({isError: true, error: error as Error })
        }finally{
            set({isLoading: false})
        }
    }
}))



export default useMainStore