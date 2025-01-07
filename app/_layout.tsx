import { StyleSheet, View } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import "../global.css";
import Header from "@/components/Navigation/Header";

const RootLayout = () => {
  return (
    <View style={{ flex: 1 }} className="bg-[#E5E6E1]">
      {/* Header */}
      <Header />
      {/* Children */}
      <Slot />
      
    </View>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
