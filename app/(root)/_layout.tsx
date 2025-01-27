import useMainStore from '@/store/mainStore'
import { KEYS } from '@/utils/keys'
import { Redirect, Slot } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

const RootLayout = () => {
    const { isLoading, authUser, isError, getAuthUser} = useMainStore()

    if(!authUser) return <Redirect href={"/sign-up"}/>
    
    return <Slot />
}

export default RootLayout
