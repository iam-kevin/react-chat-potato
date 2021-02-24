import { createContext } from 'use-context-selector'
import { Potato } from '../../../../@types/index'
import produce, { Draft } from 'immer'
import { useReducer } from 'react'

type ActionType = 'changeComposerType'

type ComposerDispatchAction<TComposerType> = { type: ActionType, composerType: TComposerType }
type ComposerDispatch = <TMessageInputType> (action: ComposerDispatchAction<TMessageInputType>) => void

export const ComposerContext = createContext<any>(undefined)
export const ComposerContextAction = createContext<ComposerDispatch | undefined>(undefined)

export const composerReducer = <TComposerType, TMessageType> (composerState: Potato.Composer.GlobalContext<TComposerType, TMessageType> , action: ComposerDispatchAction<TComposerType>) => {
    switch(action.type) {
        case 'changeComposerType':
            return produce(composerState, draft => {
                draft.composerType = action.composerType as Draft<TComposerType>
            })
        default:
            throw new Error("Unknown action type: " + action.type)
    }
}



// @ts-ignore
export const useInitComposerValue = <TUser, TMessage> (composerGlobalContext: Potato.Composer.GlobalContext<TUser, TMessage>) => useReducer(composerReducer, composerGlobalContext)
