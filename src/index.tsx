import React from 'react'
import { Potato } from '../@types/index'

import { ComposerContext, GlobalContext, ComposerContextAction, useGlobalValue, useInitComposerValue, GlobalContextAction } from './lib/internals/state'
import { useMessages } from './utils/chat'



interface MessageCanvasProps { children: (props: { messageId: number, key: string | number }) => JSX.Element }
function MessageCanvas ({ children }: MessageCanvasProps) {
    // const [keys] = useAtom(rMessageIds)
    const keys = useMessages(state => Object.keys(state).map(n => parseInt(n)))
    
    return (
        <>
            {
                keys.map((messageId) => ( children({ messageId, key:`message-id-${messageId}` })))
            }
        </>
    )
}


interface ComposerProviderProps<TComposerType, TMessageInputType> {
    initialComposer: TComposerType
    composerOptions: Potato.ComposerOption<TComposerType, TMessageInputType>
    children: React.ReactNode
}


function ComposerProvider <TComposerType, TMessageInputType>({ composerOptions, initialComposer, children }: ComposerProviderProps<TComposerType, TMessageInputType>) {
    // const [composerOpts, ] = useState<Potato.Composer.GlobalContext<TComposerType, TMessageInputType>>(composerConfig)
    const initComposerConfig = {
        composerType: initialComposer,
        composerOptions
    }

    const [composerGlobalState, composerDispatch] = useInitComposerValue(initComposerConfig)
    return (
        // @ts-ignore
        <ComposerContext.Provider value={composerGlobalState}>
            <ComposerContextAction.Provider value={composerDispatch}>
                {/* Composer */}
                {children}
            </ComposerContextAction.Provider>
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

export interface ComposerBoxProps<TComposerType, TMessageInputType> {
    sendAction: Potato.Composer.OptionComponentProps<TComposerType, TMessageInputType>['sendAction']
}

export interface PotatoChatProps<TMessageInputType, TComposerType> {
    composerOptions: Potato.ComposerOption<TComposerType, TMessageInputType>
    sendAction: ComposerBoxProps<TComposerType, TMessageInputType>['sendAction']
    initialComposer: TComposerType
    messageComponent: MessageCanvasProps['children']
    messageCanvasWrapper: (props: { children: React.ReactNode }) => JSX.Element
    composerBox: (props: ComposerBoxProps<TComposerType, TMessageInputType>) => JSX.Element
}

interface PotatoChatProviderProps<TUser, TMessage> {
    initialMessages?: Potato.Messages<TMessage>
    globalChatContext: Potato.GlobalChatContext<TUser>
    children: React.ReactNode
}

export function PotatoChatProvider<TUser, TMessage> ({ children, initialMessages, globalChatContext }: PotatoChatProviderProps<TUser, TMessage>) {
    return (
        <GlobalContextProvider
            initialMessages={initialMessages} 
            globalChatContext={globalChatContext}>
                {children}
        </GlobalContextProvider>
    )
}

/**
 * Provider to provide the chat ui with state to manage
 * chat context
 */
export function PotatoChat<TComposerType extends string, TMessageInputType> ({
    composerOptions, 
    sendAction, 
    initialComposer, 
    messageComponent: MessageComponent,
    messageCanvasWrapper: MessageCanvasWrapper,
    composerBox: ComposerBox,
}: PotatoChatProps<TComposerType, TMessageInputType>) {
    // console.log("Initialized Globasl State: ", globalChatContext)
    return(
        <>
            {/* Message Canvas Region */}
            <MessageCanvasWrapper>
                <MessageCanvas>
                    {messageProps => <MessageComponent {...messageProps} />}
                </MessageCanvas>
            </MessageCanvasWrapper>

            {/* Composer Box Region */}
            <ComposerProvider 
                initialComposer={initialComposer} 
                composerOptions={composerOptions}>
                <ComposerBox
                    sendAction={sendAction}/>
            </ComposerProvider>
        </>
    )
}
