import { useContextSelector } from "use-context-selector"
import { Potato } from "../../typings"
import { GlobalContext } from "../lib/internals/state"

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

