import React from "react";
import { Slot } from "expo-router";
import { View } from "react-native";

const MainLayout = () => {
  return (
    <View className="bg-[#E5E6E1]">
      <Slot />
    </View>
  );
};

export default MainLayout;
