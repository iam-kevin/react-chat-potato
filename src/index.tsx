import React, { useCallback, useState } from 'react'
import { Potato } from '../@types/index'

import { ComposerContext, GlobalContext, GlobalContextAction, useGlobalValue } from './lib/internals/state'
import { NewBaseMessage } from './lib/components/frame'
import { useComposerComponent, useMessages } from './lib/utils'


interface PotatoChatComposerProps<TComposerType, TMessageInputType> {
    initialComposer: TComposerType
    composerOptions: Potato.Composer.GlobalContext<TComposerType, TMessageInputType>
    sendAction: Potato.Composer.OptionComponentProps<TComposerType, TMessageInputType>['sendAction']
}


function PotatoChatComposer<TComposerType extends string, TMessageInputType>({ initialComposer, composerOptions, sendAction }: PotatoChatComposerProps<TComposerType, TMessageInputType>) {
    const [compType, setCompType] = useState<TComposerType>(initialComposer)
    const ComposerComponent = useComposerComponent(compType)

    // callback for adding switching btn types
    const onChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setCompType(e.target.value as TComposerType)
        console.log("Something:", e.target.value)
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
    composerOptions: PotatoChatComposerProps<TComposerType, TMessageInputType>['composerOptions']
    children: React.ReactNode
}


function ComposerProvider <TComposerType, TMessageInputType>({ composerOptions, children }: ComposerBoxProps<TComposerType, TMessageInputType>) {
    const [composerOpts, ] = useState<Potato.Composer.GlobalContext<TComposerType, TMessageInputType>>(composerOptions)

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
    composerOptions: Potato.Composer.GlobalContext<TComposerType, TMessageInputType>
    sendAction: PotatoChatComposerProps<TComposerType, TMessageInputType>['sendAction']
    initialComposer: PotatoChatComposerProps<TComposerType, TMessageInputType>['initialComposer']
}


/**
 * Provider to provide the chat ui with state to manage
 * chat context
 */
export function PotatoChat <TUser, TMessage, TMessageInputType, TComposerType extends string> ({ initialMessages, globalChatContext, composerOptions, sendAction, initialComposer }: PotatoChatProps<TUser, TMessage, TMessageInputType, TComposerType>) {
    // console.log("Initialized Globasl State: ", globalChatContext)
    return(
        <GlobalContextProvider
            initialMessages={initialMessages} 
            globalChatContext={globalChatContext}>
            <MessageBoard />
            <ComposerProvider composerOptions={composerOptions}>
                <PotatoChatComposer 
                    composerOptions={composerOptions} 
                    initialComposer={initialComposer}
                    sendAction={sendAction}/>
            </ComposerProvider>
        </GlobalContextProvider>
    )
}
