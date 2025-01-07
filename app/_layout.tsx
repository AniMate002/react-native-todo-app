import { StyleSheet, View } from "react-native";
import React from "react";
import { Slot, Stack, Tabs } from "expo-router";
import "../global.css";
import Header from "@/components/Navigation/Header";

const RootLayout = () => {
  return (
    <View style={{ flex: 1 }} className="bg-[#E5E6E1]">
      {/* Header */}
      <Header />
      <Stack>
        <Stack.Screen name="(main)" options={{headerShown: false}}/>
        <Stack.Screen name="(addtask)" options={{headerShown: false, presentation: "modal"}}/>
      </Stack>
      
    </View>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
