import React, { useCallback, useState } from 'react'
import { Provider, useAtom } from 'jotai'
import { Potato } from '../@types/index'

import { ComposerMessageInputType, ComposerType, rMessageIds } from './lib/internals/state'
import { BaseMessage } from './lib/components/frame'
import { useComposerComponent } from './lib/utils'
import { ComposerComponentProps } from './lib'

interface PotatoChatComposerProps {
    initialComposer: ComposerType
    sendCallback: ComposerComponentProps<ComposerMessageInputType>['sendCallback']
}

function PotatoChatComposer({ initialComposer, sendCallback }: PotatoChatComposerProps) {
    const [compType, setCompType] = useState<ComposerType>(initialComposer)
    const ComposerComponent = useComposerComponent<ComposerType>(compType)

    // callback for adding switching btn types
    const onChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => setCompType(e.target.value as ComposerType), [])


    return (
        <div>
            <ComposerComponent sendCallback={sendCallback} />
            <div>
                <label>Composer Option:</label>
                <select name="composer-option" onChange={onChange} value={compType}>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                </select>
            </div>
        </div>
    )
}

interface MessageCanvas {}
function MessagesCanvas (props: MessageCanvas) {
    const [keys] = useAtom(rMessageIds)
    
    return (
        <>
            {
                keys.map((messageId) => (
                    // Message section
                    <div className="" key={`message-id-${messageId}`}>
                        {/* actual message bubble */}
                        <BaseMessage messageId={messageId} /> 
                    </div>
                ))                 
            }
        </>
    )
}



interface PotatoChatProps extends PotatoChatComposerProps {}

/**
 * Entire housed chat UI
 */
export function PotatoChat({ initialComposer, sendCallback }: PotatoChatProps) {    
    return (
        <div>
            <div>
                <MessagesCanvas />
            </div>
            <PotatoChatComposer
                sendCallback={sendCallback}
                initialComposer={initialComposer} />
        </div>
    )
}


export interface PotatoProviderProps {
    initialMessages?: Potato.Messages,
    children: any
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
