import React from 'react'
import { Provider, useAtom } from 'jotai'
import { PotatoProviderProps, PotatoChatProps } from '../@types/index'

import { rMessageIds, currentComposer, getComposerInfo, composerAction } from './lib/internals/state'
import { BaseMessage } from './lib/components/frame'

function PotatoChatComposer() {
    const [composerType] = useAtom(currentComposer)
    const [composer] = useAtom(getComposerInfo(composerType))
    const [composerSendAction] = useAtom(composerAction)

    // to render component
    const ComposerComponent = composer.component
    return (
        <ComposerComponent sendAction={composerSendAction}/>
    )
}


/**
 * Entire housed chat UI
 */
export function PotatoChat({ initialMessages }: PotatoChatProps) {
    const [messages] = useAtom(rMessageIds)
    
    return (
        <div>
            {
                messages.map((messageId) => (
                    <BaseMessage messageId={messageId} /> 
                ))                 
            }
            <PotatoChatComposer />
        </div>
    )
}

/**
 * Provider to provide the chat ui with state to manage
 * chat context
 */
export function PotatoProvider ({ children }: PotatoProviderProps) {
    return(
        <Provider>
            {children}
        </Provider>
    )
}
