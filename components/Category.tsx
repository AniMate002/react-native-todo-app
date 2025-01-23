import images from '@/constants/images';
import { colors } from '@/utils/types';
import React from 'react'
import { View, Text, Image } from 'react-native'

interface CategoryProps {
    category: string;
    index: number;
}

const Category:React.FC<CategoryProps> = (props) => {
    const randomColor = colors[props.index];
    return (
            <View style={{backgroundColor: randomColor?.bg}} className='w-[150px] h-[150px] rounded-2xl relative'>
                <Text style={{color: randomColor?.text}} className='text-xl font-rubik-medium px-4 pt-4 '>{props.category}</Text>
                <Text className='px-4 text-black-200 font-rubik '>0{props.index} Tasks</Text>
                <Image source={images[props.category]} resizeMode='contain' className='size-32 absolute -bottom-2 right-0'/>
            </View>
    );
};


export default Category
