import { useAtom } from 'jotai'
import React from 'react'
import { Potato } from '../../../../../@types'
import { getMessage, getUser } from '../../../internals'

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
    const [user] = useAtom(getUser(userId))

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

export default function BaseMessage ({ messageId }: MessageProps) {
    const [message] = useAtom(getMessage(messageId as unknown as number))
    const user = useChatUser(message.user, { name: "Me" })

    return (
        <div className="py-2">
            <label className="text-sm font-semibold text-gray-500">{user.name}</label>
            <p>{message.input}</p>
        </div>
    )
}
