import { IAttachment } from '@/utils/types'
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

interface AttachmentsProps {
    attachments: Array<IAttachment>;
    handleDeleteAttachment: (name: string) => void
}

const Attachments:React.FC<AttachmentsProps> = ({ attachments, handleDeleteAttachment }) => {

    
    const isImage = (mimeType: string) => {
        return mimeType === "image/jpeg" ||
        mimeType === "image/png" ||
        mimeType === "image/jpg" ||
        mimeType === "application/pdf"
    }
    
    return (
        <View className='flex items-center justify-center gap-4 flex-row mt-2 flex-wrap group-last:justify-start'>
            {attachments.filter(singleAttachment => isImage(singleAttachment.mimeType)).map((attachment, index) => (
                <TouchableOpacity 
                onPress={() => handleDeleteAttachment(attachment.name)}
                key={index} 
                className='flex items-center gap-2'>
                    <Image source={{uri: attachment.uri}} className='size-24 rounded-xl'/>
                    <Text>{attachment.name.length > 10 ? attachment.name.slice(0, 8) + "..." : attachment.name}</Text>
                </TouchableOpacity>
            ))}
            {attachments.filter(singleAttachment => !isImage(singleAttachment.mimeType)).map((attachment, index) => (
                <TouchableOpacity 
                onPress={() => handleDeleteAttachment(attachment.name)}
                key={index} 
                className='flex items-center gap-2'>
                    <View className='flex items-center justify-center size-24 rounded-xl bg-emerald-500  border-emerald-700 '>
                        <Text className='text-white font-rubik-medium'>File .{attachment.name.split(".").pop()}</Text>
                    </View>
                    <Text>{attachment.name.length > 10 ? attachment.name.slice(0, 8) + "..." : attachment.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default Attachments
