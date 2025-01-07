import { Link, useSegments } from 'expo-router'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const Header:React.FC = () => {
    const router = useSegments()
    const stylesForActiveNavigation = "text-white font-bold text-2xl bg-black rounded-full py-[10px] px-[20px]";
    const stylesForUnactiveNavigation = "text-[16px] text-[#464646] font-semibold py-[10px] px-[20px]"
    return (
        <View className='pt-[60px] flex flex-row justify-between items-center px-[20px]'>
            <View className='flex flex-row items-center justify-center'>
                <Link className={!router[1] ? stylesForActiveNavigation : stylesForUnactiveNavigation} href={"/"}>Preview</Link>
                <Link className={router.length > 1 ? stylesForActiveNavigation : stylesForUnactiveNavigation} href={"/alltasks"}>All Tasks</Link>
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
