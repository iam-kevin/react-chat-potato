import React, { useState } from 'react'
import { Provider, useAtom } from 'jotai'
import { PotatoProviderProps, PotatoChatProps } from '../@types/index'

import { messagesAtom, ComposerType } from './lib/internals/state'
import { BaseMessage } from './lib/components/frame'
import { useComposerComponent } from './lib/utils'


function PotatoChatComposer() {
    const [compType, setCompType] = useState<ComposerType>('text')
    const ComposerComponent = useComposerComponent(compType)
    // const onChange = useCallback(() => {} )

    return (
        <div>
            <ComposerComponent />
            <div>
                <label>Composer Option:</label>
                <select name="composer-option" onChange={(e) => {
                    console.log("Change the value to:", e.target.value)

                    // @ts-ignore
                    setCompType(e.target.value)
                }}>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                </select>
            </div>
        </div>
    )
}


/**
 * Entire housed chat UI
 */
export function PotatoChat({ initialMessages }: PotatoChatProps) {
    const [messages] = useAtom(messagesAtom)
    
    return (
        <div>
            {
                Object.keys(messages).map((messageId) => (
                    // Message section
                    <div className="" key={`message-id-${messageId}`}>
                        {/* actual message bubble */}
                        <BaseMessage messageId={messageId} /> 
                    </div>
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
