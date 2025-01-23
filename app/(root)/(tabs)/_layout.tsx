import { Tabs } from 'expo-router'
import React from 'react'
import { View, Text, Image } from 'react-native'
import icons from '@/constants/icons'

const TabIcon = ({ focused, icon, title}: { focused: boolean; icon: any; title: string}) => {
    return (
        <View className={"flex-1 mt-3 flex flex-col items-center justify-center"}>
            <Image source={icon} tintColor={focused ? "#0061ff" : "#666876"} resizeMode={"contain"} className={"size-8"}/>
            <Text className={`${focused ? "text-primary-300 font-rubik-medium" : "text-black-200 font-rubik"} text-xs w-full text-center mt-1`}>{title}</Text>
        </View>
    )
}

const TabsLayout = () => {
    return (
        <Tabs 
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: "transparent",
                position: "absolute",
                borderTopColor: "#0061FF1A",
                borderTopWidth: 1,
                minHeight: 17
            }
        }}
        
        >
            <Tabs.Screen 
            name='index' 
            options={{
                title: "Home", 
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon icon={icons.home} focused={focused} title="Home"/>
                )
            }}/>

            <Tabs.Screen 
            name='create' 
            options={{
                title: "Create", 
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon icon={icons.area} focused={focused} title="Create"/>
                )
            }}/>

            <Tabs.Screen 
            name='profile' 
            options={{
                title: "Profile", 
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon icon={icons.edit} focused={focused} title="Profile"/>
                )
            }}/>
        </Tabs>
    )
}

export default TabsLayout
