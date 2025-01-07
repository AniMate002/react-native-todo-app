import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { Slot, Stack, Tabs } from "expo-router";
import "../global.css";
import Header from "@/components/Navigation/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TASKS_STORAGE_KEY } from "@/store/useBasicStore";

const RootLayout = () => {
  useEffect(() => {
    async function CreateAsynchStorage() {
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, "[]")
    }
  }, [])
  return (
    <View style={{ flex: 1 }} className="bg-[#E5E6E1]">
      {/* Header */}
      <Header />
      <Stack>
        <Stack.Screen name="(main)" options={{headerShown: false}}/>
        <Stack.Screen name="(addtask)" options={{headerShown: false, presentation: "modal"}}/>
        <Stack.Screen name="(edittask)" options={{headerShown: false}}/>
      </Stack>
      
    </View>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
