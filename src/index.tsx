import React, { useCallback, useState } from 'react'
import { Potato } from '../@types/index'

import { ComposerContext, GlobalContext, GlobalContextAction, useGlobalValue } from './lib/internals/state'
import { NewBaseMessage } from './lib/components/frame'
import { useComposerComponent, useMessages } from './lib/utils'


interface PotatoChatComposerProps<TComposerType, TMessageInputType> {
    initialComposer: TComposerType
    sendAction: Potato.Composer.OptionComponentProps<TComposerType, TMessageInputType>['sendAction']
}


function PotatoChatComposer<TComposerType extends string, TMessageInputType>({ initialComposer, sendAction }: PotatoChatComposerProps<TComposerType, TMessageInputType>) {
    const [compType, setCompType] = useState<TComposerType>(initialComposer)
    const ComposerComponent = useComposerComponent(compType)

    // callback for adding switching btn types
    const onChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setCompType(e.target.value as TComposerType)
    }, [])


    return (
        <>
            {/* 
                TODO: Fix the composer selector            
            */}
            <ComposerComponent composerType={compType} sendAction={sendAction} />
            <div>
                <label>Composer Option:</label>
                <select name="composer-option" onChange={onChange} value={compType}>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                </select>
            </div>
        </>
    )
}


interface NewMessageCanvasProps {}
function NewMessagesCanvas (props: NewMessageCanvasProps) {
    // const [keys] = useAtom(rMessageIds)
    const keys = useMessages(state => Object.keys(state).map(n => parseInt(n)))
    
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


interface ComposerBoxProps<TComposerType, TMessageInputType> {
    composerConfig: Potato.Composer.GlobalContext<TComposerType, TMessageInputType>
    children: React.ReactNode
}


function ComposerProvider <TComposerType, TMessageInputType>({ composerConfig, children }: ComposerBoxProps<TComposerType, TMessageInputType>) {
    const [composerOpts, ] = useState<Potato.Composer.GlobalContext<TComposerType, TMessageInputType>>(composerConfig)

    return (
        // @ts-ignore
        <ComposerContext.Provider value={composerOpts}>
            {/* Composer */}
            {children}
        </ComposerContext.Provider>
    )
}


interface GlobalContextProviderProps<TUser, TMessageInputType> {
    initialMessages?: Potato.Messages<TMessageInputType>
    globalChatContext: Potato.GlobalChatContext<TUser>
    children: React.ReactNode
}


const GlobalContextProvider = <TUser, TMessage> ({ children, initialMessages, globalChatContext }: GlobalContextProviderProps<TUser, TMessage>) => {
    const initialState: Potato.GlobalContext<TUser, TMessage> = { 
        ...globalChatContext, 
        messages: (initialMessages || []) as Potato.Messages<TMessage>  
    }
    
    const [globalVals, globalDispatch] = useGlobalValue(initialState)

    return (
        <GlobalContext.Provider value={globalVals}>
            <GlobalContextAction.Provider value={globalDispatch}>
                {children}
            </GlobalContextAction.Provider>
        </GlobalContext.Provider>
    )
}

export interface PotatoChatProps<TUser, TMessage, TMessageInputType, TComposerType> {
    initialMessages?: Potato.Messages<TMessage>
    globalChatContext: Potato.GlobalChatContext<TUser>
    composerConfig: Potato.Composer.GlobalContext<TComposerType, TMessageInputType>
    sendAction: PotatoChatComposerProps<TComposerType, TMessageInputType>['sendAction']
    initialComposer: TComposerType
}


/**
 * Provider to provide the chat ui with state to manage
 * chat context
 */
export function PotatoChat <TUser, TMessage, TMessageInputType, TComposerType extends string> ({ initialMessages, globalChatContext, composerConfig: composerOptions, sendAction, initialComposer }: PotatoChatProps<TUser, TMessage, TMessageInputType, TComposerType>) {
    // console.log("Initialized Globasl State: ", globalChatContext)
    return(
        <GlobalContextProvider
            initialMessages={initialMessages} 
            globalChatContext={globalChatContext}>
            <MessageBoard />
            <ComposerProvider composerConfig={composerOptions}>
                <PotatoChatComposer
                    initialComposer={initialComposer}
                    sendAction={sendAction}/>
            </ComposerProvider>
        </GlobalContextProvider>
    )
}
