import { SplashScreen, Stack } from "expo-router";
import "../global.css";
import * as Network from 'expo-network'
import 'react-native-get-random-values';
import { useEffect } from "react";
import { useFonts } from "expo-font";
import useMainStore from "@/store/mainStore";
import { View } from "react-native";



const RootLayout = () => {

  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    if(!fontsLoaded){
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])


  const { getAuthUser, authUser } = useMainStore()
  useEffect(() => {
    getAuthUser()
  }, [])



  
  return (
      <Stack screenOptions={{headerShown: false}}/>
)
};

export default RootLayout;

