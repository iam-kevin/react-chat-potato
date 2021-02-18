import { useAtom } from 'jotai'
import React from 'react'
import { getMessage } from '../../../internals'

interface MessageProps {
    // identifier of the message
    messageId: string
}

export default function BaseMessage ({ messageId }: MessageProps) {
    const [message] = useAtom(getMessage(messageId as unknown as number))
    
    return (
        <div>{message.text}</div>
    )
}
