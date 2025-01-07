import React from 'react'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import DatePicker from 'react-native-modern-datepicker';

export interface IModalCalendar {
    showCalendar: boolean,
    setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>,
    setDate: React.Dispatch<React.SetStateAction<string>>
} 
// MODAL WINDOW WITH DATE PICKER FOR A ADD TASK SCREEN
const ModalCalendar:React.FC<IModalCalendar> = ({ showCalendar, setShowCalendar, setDate}) => {
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={showCalendar}
            onRequestClose={() => setShowCalendar(false)} 
            
        >
            <View className="flex-1 justify-center items-center bg-opacity-50 flex-col">
                <View className='w-[90%] bg-white rounded-xl p-[10px] flex items-center justify-center'>
                    {/* DATE PICKER */}
                    <DatePicker 
                    onSelectedChange={date => setDate(date)}
                    mode='datepicker' 
                    />
                    <View className='flex items-end justify-center flex-row gap-4'>
                    {/* CLOSE MODAL BUTTON */}
                        <TouchableOpacity
                        onPress={() => setShowCalendar(false)}
                        className='bg-blue-500 w-[100px] h-[30px] rounded-lg flex items-center justify-center'
                        >
                            <Text className='text-white font-semibold '>Close</Text>
                        </TouchableOpacity>
                    {/* SELECT DATE BUTTON */}
                        <TouchableOpacity
                        onPress={() => setShowCalendar(false)}
                        className='bg-blue-500 w-[100px] h-[30px] rounded-lg flex items-center justify-center'
                        >
                            <Text className='text-white font-semibold '>Select</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalCalendar
