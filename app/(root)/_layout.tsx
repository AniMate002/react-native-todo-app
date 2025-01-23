import useMainStore from '@/store/mainStore'
import { KEYS } from '@/utils/keys'
import { Redirect, Slot } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

const RootLayout = () => {
    const { isLoading, authUser, isError, getAuthUser} = useMainStore()

    useEffect(() => {
        console.log("USER FROM STORE IN LAYOUT: ", authUser)
    }, [authUser, isError, isLoading])

 

    if(!authUser) return <Redirect href={"/sign-up"}/>
    
    return <Slot />
}

export default RootLayout
