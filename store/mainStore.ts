import { ITask, IUser } from '@/utils/types';
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS } from '@/utils/keys';


interface MainStoreI {
    allUsers: Array<IUser>;
    authUser: IUser | null;
    tasks: Array<ITask>;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    getAllUsers: () => void;
    getAuthUser: () => Promise<void>;
    createUser: (name: string) => void;
    createNewTask: (task: ITask) => void;
    getTasksByUserId: () => Promise<void>;
}

const useMainStore = create<MainStoreI>((set, get) => ({
    allUsers: [],
    authUser: null,
    tasks:[],
    isLoading: false,
    isError: false,
    error: null,
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
            const res = await fetch("https://json-server-todo-react-native.vercel.app/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, id })
            });

            await AsyncStorage.setItem(KEYS.storageKey, JSON.stringify({name, id}))

            set({authUser: {name, id}, error: null, isError: false})
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
            await AsyncStorage.setItem(KEYS.storageKeyTasks, JSON.stringify([...get().tasks, {...task, id}]))

            const data = await res.json()
            set({tasks: [...get().tasks, data], error: null, isError: false})            
        } catch (error) {
            console.log(error)
            set({isError: true, error: error as Error })
        }finally{
            set({isLoading: false})
        }
        console.log("ALL TASKS IN STORE:", get().tasks)
    }
}))



export default useMainStore