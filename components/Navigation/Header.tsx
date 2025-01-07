import { Link } from 'expo-router'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const Header:React.FC = () => {
    return (
        <View className='pt-[60px] flex flex-row justify-between items-center px-[20px]'>
            <View className='flex flex-row items-center justify-center gap-4'>
                <Link className='py-[10px] px-[20px] text-white font-bold text-2xl bg-black rounded-full' href={"/"}>Preview</Link>
                <Link className='text-[16px] text-[#464646] font-semibold' href={"/alltasks"}>All Tasks</Link>
            </View>

            <Link href={"/addtask"} className='w-[45px] h-[45px] bg-[#D9D9D9] flex items-center justify-center rounded-full'>
                <Text  className='text-[#464646] text-[18px] font-bold'>+</Text>
            </Link>
        </View>
    )
}

export default Header
