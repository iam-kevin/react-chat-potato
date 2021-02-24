import { useCallback } from "react"
import { useContextSelector } from "use-context-selector"
import { Potato } from "../../@types"
import { ComposerContext, ComposerContextAction } from "../lib/internals"

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
