import { Link, useSegments, useRouter } from 'expo-router'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
// MAIN HEADER COMPONENTS
const Header:React.FC = () => {
    const segments = useSegments()
    const router = useRouter()
    // STYLES FOR ACTIVE NAV BUTTON
    const stylesForActiveNavigation = "text-white font-bold text-2xl bg-black rounded-full py-[10px] px-[20px]";
    // STYLES FOR UNACTIVE NAV BUTTON
    const stylesForUnactiveNavigation = "text-[16px] text-[#464646] font-semibold py-[10px] px-[20px]"
    return (
        <View className='pt-[60px] flex flex-row justify-between items-center px-[20px]'>
            <View className='flex flex-row items-center justify-center'>
                {/* LINK TO THE HOME PAGE */}
                <TouchableOpacity 
                activeOpacity={0.6}
                onPress={() => router.navigate("/")}
                >
                    <Text className={!segments[1] ? stylesForActiveNavigation : stylesForUnactiveNavigation}>Preview</Text>
                </TouchableOpacity>
                {/* LINK TO THE ALLTASKS PAGE */}
                <TouchableOpacity 
                activeOpacity={1}
                onPress={() => router.navigate("/alltasks")}
                >
                    <Text className={segments.length > 1 ? stylesForActiveNavigation : stylesForUnactiveNavigation}>All Tasks</Text>
                </TouchableOpacity>
            </View>

            {/* LINK THAT OPENS A MODEL FOR ADDING A NEW TASK */}
            <Link href={"/addtask"}>
                <View className='w-[45px] h-[45px] bg-[#D9D9D9] flex items-center justify-center rounded-full'>
                    <Text  className='text-[#464646] text-[18px] font-semibold'>+</Text>
                </View>
            </Link>
        </View>
    )
}

export default Header
