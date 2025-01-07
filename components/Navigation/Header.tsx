import { Link, useSegments, useRouter } from 'expo-router'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const Header:React.FC = () => {
    const segments = useSegments()
    const router = useRouter()
    const stylesForActiveNavigation = "text-white font-bold text-2xl bg-black rounded-full py-[10px] px-[20px]";
    const stylesForUnactiveNavigation = "text-[16px] text-[#464646] font-semibold py-[10px] px-[20px]"
    return (
        <View className='pt-[60px] flex flex-row justify-between items-center px-[20px]'>
            <View className='flex flex-row items-center justify-center'>
                <TouchableOpacity 
                activeOpacity={0.6}
                onPress={() => router.navigate("/")}
                >
                    <Text className={!segments[1] ? stylesForActiveNavigation : stylesForUnactiveNavigation}>Preview</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                activeOpacity={1}
                onPress={() => router.navigate("/alltasks")}
                >
                    <Text className={segments.length > 1 ? stylesForActiveNavigation : stylesForUnactiveNavigation}>All Tasks</Text>
                </TouchableOpacity>
            </View>

            <Link href={"/addtask"}>
                <View className='w-[45px] h-[45px] bg-[#D9D9D9] flex items-center justify-center rounded-full'>
                    <Text  className='text-[#464646] text-[18px] font-semibold'>+</Text>
                </View>
            </Link>
        </View>
    )
}

export default Header
