import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

interface AndroidTimePickerProps{
    dateAndTime: Date;
    minDate?: Date;
    maxDate?: Date;
    setFullDateAndTime: React.Dispatch<React.SetStateAction<Date>>
}

const AndroidTimePicker:React.FC<AndroidTimePickerProps> = ({ dateAndTime, minDate, maxDate, setFullDateAndTime}) => {
    const [date, setDate] = useState<Date>(new Date())
    const [time, setTime] = useState<Date>(new Date())
    useEffect(() => {
        let fullDateAndTime = new Date(date);
        fullDateAndTime.setHours(time.getHours())
        fullDateAndTime.setMinutes(time.getMinutes())

        console.log("UPDATED FULL TIME AND DATE: ", fullDateAndTime.toLocaleString())
        setFullDateAndTime(fullDateAndTime)

    }, [time, date])
    return (
        <View className='flex items-center gap-2 flex-row'>
            <TouchableOpacity onPress={() => DateTimePickerAndroid.open({value: date, maximumDate: maxDate, minimumDate: minDate, mode:"date", onChange: (e, date) => setDate(date || new Date())})}>
                <Text className='rounded-xl p-2 bg-[#EBEBEB]'>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => DateTimePickerAndroid.open({value: time, mode:"time", onChange: (e, time) => setTime(time || new Date())})}>
                <Text className='rounded-xl p-2 bg-[#EBEBEB]'>{time.toLocaleTimeString().slice(0, 5)}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AndroidTimePicker
