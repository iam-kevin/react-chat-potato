import React, { useCallback, useState } from 'react'
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
    globalChatContext: Potato.GlobalChatContext
    composerOptions?: Potato.Composer.GlobalContext
    sendCallback: PotatoChatComposerProps['sendCallback']
    initialComposer: PotatoChatComposerProps['initialComposer']
    children: React.ReactNode
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
    const [composerOpts, ] = useState(composerOptions)

    return (
        // @ts-ignore
        <ComposerContext.Provider value={composerOpts}>
            {/* Composer */}
            <NewPotatoChatComposer initialComposer={initialComposer} sendCallback={sendCallback} />
        </ComposerContext.Provider>
    )
}

interface GlobalContextProviderProps {
    initialMessages?: Potato.Messages
    globalChatContext: Potato.GlobalChatContext
    children: React.ReactNode
}


const GlobalContextProvider = ({ children, initialMessages, globalChatContext: globalContextState }: GlobalContextProviderProps) => {
    const [globalVals, globalDispatch] = useReducer(potatoReducer, { ...globalContextState, messages: initialMessages || [] } as Potato.GlobalContext)
    // const initialState: Potato.GlobalContext = { ...globalContextState, messages: initialMessages || [] }

    return (
        <GlobalContext.Provider value={globalVals}>
            <GlobalContextAction.Provider value={globalDispatch}>
                {children}
            </GlobalContextAction.Provider>
        </GlobalContext.Provider>
    )
}


/**
 * Provider to provide the chat ui with state to manage
 * chat context
 */
export function PotatoChat ({ initialMessages, globalChatContext, composerOptions, sendCallback, initialComposer }: PotatoChatProps) {
    return(
        <GlobalContextProvider
            initialMessages={initialMessages} 
            globalChatContext={globalChatContext}>
            <MessageBoard />
            <ComposerBox 
                composerOptions={composerOptions} 
                initialComposer={initialComposer}
                sendCallback={sendCallback}/>
        </GlobalContextProvider>
    )
}
