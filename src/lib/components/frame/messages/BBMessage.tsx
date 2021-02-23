import React from 'react'
import { Potato } from '../../../../../@types'
import { useChatUsers, useMessages } from '../../../utils'

interface MessageProps {
    // identifier of the message
    messageId: string
}

/**
 * Gets the chat user
 */
export function useChatUser(
    userId: 'self' | string, 
    selfUser: Potato.User,
    defaultUnknownUser: Potato.User | undefined = undefined
) {
    const user = useChatUsers(users => Object.keys(users).includes(userId) ? users[userId] : undefined)
    // const user = useContextSelector(GlobalContext, state => Object.keys(state[0].users).includes(userId) ? state[0].users[userId] : undefined)

    if (user !== undefined) {
        if (user !== null) {
            return user
        } else {
            return selfUser
        }
    }

    // if there is no user.. the default layout for the user
    if (defaultUnknownUser !== undefined) { return defaultUnknownUser }

    // if there is not user 
    //  and there is not default 
    //  object
    return {
        name: 'Anonymous',
    } as Potato.User
}

export function useMessage(messageId: string) {
    const message = useMessages(messages => messages[messageId as unknown as number])
    return message
}

export default function NewBaseMessage ({ messageId }: MessageProps) {
    const message = useMessage(messageId)
    const user = useChatUser(message.user, { name: "Me" })

    return (
        <div className="py-2">
            <label className="text-sm font-semibold text-gray-500">{user.name}</label>
            <p>{message.input}</p>
        </div>
    )
}
