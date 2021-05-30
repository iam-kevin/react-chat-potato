import { useCallback } from "react"
import { useContextSelector } from "use-context-selector"
import { Potato } from "../../typings"
import { GlobalContextAction } from "../lib/internals"
import { useComposerContext } from "./composer"
import { useGlobalContext } from "./global"


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
    }, [input, composerType, sendAction])
}
