import { ComposerContext, GlobalContext, GlobalContextAction } from "./internals"
import { ComposerType, ComposerMessageInputType } from './internals/state/composer'

import { useContextSelector } from 'use-context-selector'
import { Potato } from "../../@types"

import { useCallback } from "react"

export function useComposerContext<T>(callback: (composerContext: Potato.Composer.GlobalContext) => T) {
    return useContextSelector(ComposerContext, state => {
        if (state === undefined) {
            throw new Error("Make sure function is used in the <ComposerContext.Provider />")            
        }

        return callback(state)
    })
}

export function useGlobalContext<T>(callback: (composerContext: Potato.GlobalContext) => T) {
    return useContextSelector(GlobalContext, state => {
        if (state === undefined) {
            throw new Error("Make sure function is used in the <GlobalContext.Provider />")            
        }

        return callback(state)
    })
}

/**
 * Gets the composer
 * If undefined, gets the current set composer
 * @param composerType 
 */
export function useComposer(composerType: ComposerType | undefined = undefined) {
    // const [currentComposerType] = useAtom(currentComposer)    
    const currentComposerType = useComposerContext(state => state.composerType)
    let cmpType = composerType

    if (cmpType === undefined) {
        cmpType = currentComposerType
    }

    // const [composer] = useAtom(getComposerInfo(cmpType))
    const composer = useComposerContext(state => state.composerOptions[currentComposerType])
    return composer
}

/**
 * Gets the component for rendering the composer
 * @param composerType 
 */
export function useComposerComponent(composerType: ComposerType | undefined = undefined) {
    const composer = useComposer(composerType)

    // for renditions
    return composer.component
}


export function useMessages<T>(callback: undefined | ((messages: Potato.Messages) => T) = undefined): T  {
    // @ts-ignore
    return useGlobalContext<T>(useCallback(state => callback === undefined ? state.messages as Potato.Messages: callback(state.messages) as T, [callback]))
}

export function useChatUsers<T>(callback: undefined | ((users: Potato.GlobalContext['users']) => T) = undefined): T  {
    // @ts-ignore
    return useGlobalContext<T>(useCallback(state => callback === undefined ? state.users as Potato.GlobalContext['users']: callback(state.users) as T, [callback]))
}


export function useMessageUpdater() {
    // const messages = useMessages(messages => messages[messageId as unknown as number])
    const dispatch = useContextSelector(GlobalContextAction, state => state)

    if (dispatch === undefined) {
        throw new Error("Make sure you have this wrapped in <GlobalContext.Provider>")
    }

    return useCallback((message: Potato.Composer.NewMessage<ComposerMessageInputType>) => {
        // const originDate = useContextSelector(GlobalContext, state => state[0].dateTime)
        dispatch({ type: 'updateMessage', message })
    }, [dispatch])
}
