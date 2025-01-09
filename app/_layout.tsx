import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import "../global.css";
import Header from "@/components/Navigation/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TASKS_STORAGE_KEY } from "@/store/useBasicStore";

// MAIN ROOT LAOUT ENTRY POINT
const RootLayout = () => {
  // CREATING A DEDICATED FIELD IN LOCALSTORAGE
  useEffect(() => {
    async function CreateAsynchStorage() {
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, "[]")
    }
  }, [])
  return (
    <View style={{ flex: 1 }} className="bg-[#E5E6E1] overflow-hidden">
      {/* Header */}
      <Header />
      {/* ALL SCREENS */}
      <Stack>
        {/* TABS WITH INDEX AND ALLTASKS SCREENS */}
        <Stack.Screen name="(main)" options={{headerShown: false}}/>
        {/* ADD TASK SCREEN */}
        <Stack.Screen name="(addtask)" options={{headerShown: false, presentation: "modal"}}/>
        {/* EDIT(INFO) TASK SCREEN */}
        <Stack.Screen name="(edittask)" options={{headerShown: false}}/>
      </Stack>

    </View>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
