import React from 'react'
import { Potato } from '../../../../../@types'
import { useChatUser, useMessage } from '../../../utils'


export default function NewBaseMessage ({ messageId }: Potato.MessageComponentProps) {
    const message = useMessage(messageId)
    const user = useChatUser(message.user, { name: "Me" }, { name: "Anonymous" })

    return (
        <div className="py-2">
            {/* @ts-ignore */}
            <label className="text-sm font-semibold text-gray-500">{user.name}</label>
            <p>{message.input as string}</p>
        </div>
    )
}
