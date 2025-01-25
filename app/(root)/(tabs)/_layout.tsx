import { Tabs } from 'expo-router'
import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import icons from '@/constants/icons'
import { TabBar } from '@/components/TabBar'



const TabsLayout = () => {
    return (
        <Tabs 
        tabBar={props => <TabBar {...props}/>} 
        screenOptions={{headerShown: false, tabBarHideOnKeyboard:true }}>
            <Tabs.Screen 
            name='index' 
            options={{
                title: "Home", 
                headerShown: false,
            }}/>

            <Tabs.Screen 
            name='explore' 
            options={{
                title: "Explore", 
                headerShown: false,
            }}/>

            <Tabs.Screen 
            name='profile' 
            options={{
                title: "Profile", 
                headerShown: false,
            }}/>

            <Tabs.Screen 
            name='create' 
            options={{
                title: "Create", 
                headerShown: false,
            }}/>
        </Tabs>
    )
}

export default TabsLayout
