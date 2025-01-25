import { Feather } from '@expo/vector-icons'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useColorScheme } from "nativewind"


const ThemeChangeButton = () => {
    const { colorScheme, toggleColorScheme} = useColorScheme()
    return (
        <TouchableOpacity onPress={() => toggleColorScheme()}>
            <Feather name={colorScheme === "dark" ? "moon" : "sun"} size={40} color={"rgb(122, 200, 150)"}/>
        </TouchableOpacity>
    )
}

export default ThemeChangeButton
