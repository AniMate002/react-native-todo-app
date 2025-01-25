import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React from 'react'
import { View, Text } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';


interface IOSTimePickerProps {
    dateAndTime: Date;
    onChange: (event: DateTimePickerEvent, selectedDate: Date | undefined) => void;
    minDate?: Date;
    maxDate?: Date;
}

const IOSTimePicker: React.FC<IOSTimePickerProps> = ({ dateAndTime, onChange, minDate, maxDate}) => {
    return (
        <DateTimePicker
        maximumDate={maxDate}
        minimumDate={minDate}
        display='default'
        value={dateAndTime}
        mode={"datetime"}
        onChange={onChange} />
    )
}

export default IOSTimePicker
