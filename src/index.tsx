import React from 'react'
import { Provider, useAtom } from 'jotai'
import { PotatoProviderProps, PotatoChatProps } from '../@types/index'

import { rMessageIds } from './lib'
import { BaseMessage } from './lib/components/frame'


export function PotatoChat({ initialMessages }: PotatoChatProps) {
    const [messages] = useAtom(rMessageIds)
    return (
        <div>
            {
                messages.map((messageId) => (
                    <BaseMessage messageId={messageId} /> 
                ))                 
            }
        </div>
    )
}

export function PotatoProvider ({ children }: PotatoProviderProps) {
    return(
        <Provider>
            {children}
        </Provider>
    )
}
