/**
 * State managed across the 
 * entire chat screen
 */

import { Potato } from '../../../../@types/index'
import { createContext } from 'use-context-selector'
import { useReducer } from 'react'
import produce from 'immer'

type ActionType = 'updateMessage'

type GlobalDispatchAction<TMessageInputType> = { type: ActionType, message: Potato.Composer.NewMessage<TMessageInputType> }
type MessageDispatch = <TMessageInputType> (action: GlobalDispatchAction<TMessageInputType>) => void

export const GlobalContext = createContext<any>(undefined)
export const GlobalContextAction = createContext<MessageDispatch | undefined>(undefined)


export const potatoReducer = <TMessageType> (messages: Potato.MessageContext<TMessageType> , action: GlobalDispatchAction<TMessageType>) => {
    switch(action.type) {
        case 'updateMessage':
            const { input, user } = action.message
            return produce(messages, draft => {
                draft.messages.push({
                    // @ts-ignore
                    input,
                    dateTimeDelta: Date.now(),
                    // dateTimeDelta: Date.now() - (new Date(originDate)).getTime(),
                    user
                })
            })
        default:
            throw new Error("Unknown action type: " + action.type)
    }
}



// @ts-ignore
export const useGlobalValue = <TUser, TMessage> (globalContext: Potato.GlobalContext<TUser, TMessage>) => useReducer(potatoReducer, globalContext)
