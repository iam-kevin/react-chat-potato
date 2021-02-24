import { ComposerContext, GlobalContext, ComposerContextAction, GlobalContextAction } from "./internals"

import { useContextSelector } from 'use-context-selector'
import { Potato } from "../../@types"

import { useCallback } from "react"


/**
 * 
 * @param callback 
 */
export function useComposerContext<T, TComposerType, TComposerInputType>(callback: <TComposerType, TComposerInputType> (composerContextState: Potato.Composer.GlobalContext<TComposerType, TComposerInputType>) => T) {
    return useContextSelector<Potato.Composer.GlobalContext<TComposerType, TComposerInputType>, T>(ComposerContext, state => {
        if (state === undefined) {
            throw new Error("Make sure function is used in the <ComposerContext.Provider />")            
        }

        return callback(state) as T
    })
}


/**
 * 
 * @param callback 
 */
export function useGlobalContext<T, TComposerType, TComposerInputType>(callback: <TUser, TMessageType> (globalContextState: Potato.GlobalContext<TUser, TMessageType>) => T) {
    return useContextSelector<Potato.GlobalContext<TComposerType, TComposerInputType>,T>(GlobalContext, state => {
        if (state === undefined) {
            throw new Error("Make sure function is used in the <GlobalContext.Provider />")            
        }

        return callback(state) as T
    })
}

/**
 * Gets the composer
 * If undefined, gets the current set composer
 * @param composerType 
 */
export function useComposer<TComposerType>(composerType: TComposerType | undefined = undefined) {
    // const [currentComposerType] = useAtom(currentComposer)    
    const currentComposerType: TComposerType = useComposerContext(state => state.composerType) as TComposerType
    let cmpType = composerType

    if (cmpType === undefined) {
        cmpType = currentComposerType
    }

    // @ts-ignore
    return useComposerContext(state => state.composerOptions[cmpType])
}

/**
 * Hook to get the component for rendering the composer
 * @param composerType 
 */
export function useComposerComponent<ComposerType>(composerType: ComposerType | undefined = undefined) {
    const composer = useComposer(composerType)

    // for renditions
    return composer.component
}


export function useComposerType<TComposerType>(): [TComposerType, (composerType: TComposerType) => void]{
    // const messages = useMessages(messages => messages[messageId as unknown as number])
    const dispatch = useContextSelector(ComposerContextAction, state => state)
    if (dispatch === undefined) {
        throw new Error("Make sure you have this wrapped in <GlobalContextAction.Provider>")
    }
    
    const composerType = useComposerContext(state => state.composerType) as TComposerType
    const setComposerType = useCallback((composerType: TComposerType) => {
        // const originDate = useContextSelector(GlobalContext, state => state[0].dateTime)
        dispatch({ type: 'changeComposerType', composerType })
    }, [dispatch])

    return [composerType, setComposerType]
}


/**
 * Hook for getting loading the messages
 * @param callback 
 */
export function useMessages<T>(callback: undefined | (<TMessageInputType> (messages: Potato.Messages<TMessageInputType>) => T) = undefined): T  {
    // @ts-ignore
    return useGlobalContext(state => callback === undefined ? state.messages as Potato.Messages<TMessageInputType>: callback(state.messages) as T)
}

/**
 * Hook for getting a message
 * @param messageId 
 */
export function useMessage(messageId: Potato.MessageComponentProps['messageId']){
    return useMessages(messages => messages[messageId])
}


/**
 * Hook for geting the chat users
 * @param callback 
 */
export function useChatUsers<T>(callback: undefined | (<TUser> (users: Potato.GlobalChatContext<TUser>['users']) => T) = undefined): T  {
    // @ts-ignore
    return useGlobalContext(useCallback(state => callback === undefined ? state.users as Potato.GlobalChatContext<T>['users']: callback(state.users) as T, [callback]))
}


/**
 * Gets the chat user
 */
export function useChatUser<TUser>(
    userId: Potato.UserType, 
    selfUser: TUser,
    defaultUnknownUser: TUser | undefined = undefined
) {
    const user = useChatUsers(users => Object.keys(users).includes(userId) ? users[userId] : undefined)
    // const user = useContextSelector(GlobalContext, state => Object.keys(state[0].users).includes(userId) ? state[0].users[userId] : undefined)

    if (user !== undefined) {
        if (user !== null) {
            return user
        } else {
            return selfUser as TUser
        }
    }

    // if there is no user.. the default layout for the user
    if (defaultUnknownUser !== undefined) { return defaultUnknownUser as TUser }

    // if there is not user 
    //  and there is not default 
    //  object
    // return {
    //     name: 'Anonymous',
    // }
    throw new Error("Default User need to be defined")
}


export function useMessageUpdater<TMessageInputType>() {
    // const messages = useMessages(messages => messages[messageId as unknown as number])
    const dispatch = useContextSelector(GlobalContextAction, state => state)

    if (dispatch === undefined) {
        throw new Error("Make sure you have this wrapped in <GlobalContextAction.Provider>")
    }

    return useCallback((message: Potato.Composer.NewMessage<TMessageInputType>) => {
        // const originDate = useContextSelector(GlobalContext, state => state[0].dateTime)
        dispatch({ type: 'updateMessage', message })
    }, [dispatch])
}


export function useSendCallback<TComposerType, TMessageInputType>(input: TMessageInputType, sendAction: Potato.Composer.OptionComponentProps<TComposerType, TMessageInputType>['sendAction'] ) {
    // the message context is missing
    // const [, updateMessageList] = useAtom(updateMessages)
    const updateMessageList = useMessageUpdater<TMessageInputType>()
    const composerType = useComposerContext(state => state.composerType) as TComposerType
    
    // TODO: uncomment this: it seems that for every keystroke this callback is being rerendered
    // console.log("ComposerType:", composerType)

    // onSend Method
    return useCallback(() => {
        const newMessage: Potato.Composer.NewMessage<TMessageInputType> = {
            input,
            user: 'self'
        }
        sendAction(newMessage, composerType)
            .then(() => {
                // updates the message list with a new message
                updateMessageList(newMessage)
            })
    }, [input, composerType, sendAction, updateMessageList])
}

