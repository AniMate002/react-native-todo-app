import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'

const Properties = () => {
    const { id } = useLocalSearchParams()
    return (
        <View>
            <Text>Properties: task {id}</Text>
        </View>
    )
}

export default Properties
