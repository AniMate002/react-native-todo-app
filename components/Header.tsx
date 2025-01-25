import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import ThemeChangeButton from './ThemeChangeButton'
import icons from '@/constants/icons'
import { Feather } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind'
import { router } from 'expo-router'
import useMainStore from '@/store/mainStore'

const Header = ({title, customArrowButtonHandler, showLogOutBtn}: {title: string; customArrowButtonHandler: () => void; showLogOutBtn?: boolean}) => {
    const { colorScheme } = useColorScheme()
    const { logout } = useMainStore()
    const handleLogOutClick = () => {
        logout().then(() => router.navigate("/sign-up"))
    }
    return (
        <View className='flex items-center flex-row'>
            <TouchableOpacity 
            onPress={() => customArrowButtonHandler()}
            className='flex items-center justify-center size-16 bg-[#EBEBEB] dark:bg-[#212421] rounded-full'>
                <Feather name='arrow-left' size={20} color={colorScheme === "dark" ? "#bbb" : "black"}/>
            </TouchableOpacity>
            <Text className='font-rubik-medium ml-auto mr-auto text-black-300 dark:text-white w-[60%] text-center'>{title}</Text>
            {
                showLogOutBtn
                ?
                <TouchableOpacity onPress={handleLogOutClick}>
                    <Feather name='log-out' color={"#f44336"} size={24}/>
                </TouchableOpacity>
                :
                <ThemeChangeButton />
            }
        </View>
    )
}

export default Header
