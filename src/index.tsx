import React, { useCallback, useState } from 'react'
import { Provider } from 'jotai'
import { Potato } from '../@types/index'

import { ComposerContext, ComposerMessageInputType, ComposerType, GlobalContext, GlobalContextAction, potatoReducer } from './lib/internals/state'
import { NewBaseMessage } from './lib/components/frame'
import { useComposerComponent, useMessages } from './lib/utils'
import { ComposerComponentProps } from './lib'
import { useReducer } from 'react'

interface PotatoChatComposerProps {
    initialComposer: ComposerType
    sendCallback: ComposerComponentProps<ComposerMessageInputType>['sendCallback']
}


function NewPotatoChatComposer({ initialComposer, sendCallback }: PotatoChatComposerProps) {
    const [compType, setCompType] = useState<ComposerType>(initialComposer)
    const ComposerComponent = useComposerComponent(compType)

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


export interface PotatoChatProps {
    initialMessages?: Potato.Messages
    globalContextState: Potato.GlobalContext
    composerOptions?: Potato.Composer.GlobalContext
    sendCallback: PotatoChatComposerProps['sendCallback']
    initialComposer: PotatoChatComposerProps['initialComposer']
    children: React.ReactNode
}
/**
 * Provider to provide the chat ui with state to manage
 * chat context
 */
export function PotatoProvider ({ children }: any) {

    return(
        <Provider>
            {children}
        </Provider>
    )
}


interface NewMessageCanvasProps {}
function NewMessagesCanvas (props: NewMessageCanvasProps) {
    // const [keys] = useAtom(rMessageIds)
    const keys = useMessages(state => Object.keys(state))
    
    return (
        <>
            {
                keys.map((messageId) => (
                    // {/* actual message bubble */}
                    <NewBaseMessage messageId={messageId} key={`message-id-${messageId}`} /> 
                ))                 
            }
        </>
    )
}

function MessageBoard () {
    return (
        <div>
            <NewMessagesCanvas />
        </div>
    )
}

function ComposerBox ({ composerOptions, sendCallback, initialComposer }: any) {
    const [composerOpts, setComposerOpts] = useState(composerOptions)

    return (
        // @ts-ignore
        <ComposerContext.Provider value={[composerOpts, setComposerOpts]}>
            {/* Composer */}
            <NewPotatoChatComposer initialComposer={initialComposer} sendCallback={sendCallback} />
        </ComposerContext.Provider>
    )
}

/**
 * Provider to provide the chat ui with state to manage
 * chat context
 */
export function NewPotatoChat ({ initialMessages, globalContextState, composerOptions, sendCallback, initialComposer }: PotatoChatProps) {
    const [globalVals, globalDispatch] = useReducer(potatoReducer, globalContextState)

    return(
        <GlobalContext.Provider value={globalVals}>
            <GlobalContextAction.Provider value={globalDispatch}>
                <MessageBoard />
                <ComposerBox 
                    composerOptions={composerOptions} 
                    initialComposer={initialComposer}
                    sendCallback={sendCallback}/>
            </GlobalContextAction.Provider>
        </GlobalContext.Provider>
    )
}
