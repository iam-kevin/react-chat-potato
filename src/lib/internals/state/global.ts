/**
 * State managed across the 
 * entire chat screen
 */

import { Potato } from '../../../../@types/index'
import { useReducer } from 'react'

import { createContext } from 'use-context-selector'
import produce from 'immer'

type ActionType = 'updateMessage'

type GlobalDispatchAction = { type: ActionType, message: Potato.Composer.NewMessage<ComposerMessageInputType> }
type MessageDispatch = (action: GlobalDispatchAction) => void
type ComposerMessageInputType = 
    | string 
    | string
    | number

export const GlobalContext = createContext<Potato.GlobalContext | undefined>(undefined)
export const GlobalContextAction = createContext<MessageDispatch | undefined>(undefined)


export const potatoReducer = (messages: Potato.GlobalContext, action: GlobalDispatchAction) => {
    switch(action.type) {
        case 'updateMessage':
            const { input, user } = action.message
            return produce(messages, draft => {
                draft.messages.push({
                    input,
                    dateTimeDelta: Date.now(),
                    // dateTimeDelta: Date.now() - (new Date(originDate)).getTime(),
                    user
                } as Potato.MessageBody<ComposerMessageInputType>)
            })
        default:
            throw new Error("Unknown action")
    }
}



// @ts-ignore
// export const useGlobalValue = (globalContext: Potato.GlobalContext) => useReducer(potatoReducer, globalContext)
