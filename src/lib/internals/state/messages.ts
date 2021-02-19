import { atom } from 'jotai'
import produce from 'immer'

import { Potato } from '../../../../@types/index'
import { rChatDateTime } from './global'
import { ComposerMessageInputType } from './composer'

export const messagesAtom = atom<Potato.Messages>([
    { 
        text: "Hi here, how are you doing", 
        dateTimeDelta: 129122762,
        user: 'kevin'
    },
    { 
        text: "Sent this message on Wednesday", 
        dateTimeDelta: 215617315,
        user: 'kevin'
    }
])

/**
 * messages of the application
 */
export const rMessageAtom = atom(get => get(messagesAtom))
export const rMessageIds = atom(get => Object.keys(get(rMessageAtom)))

/**
 * Get the message by the message id
 * @param messageId message
 */
export const getMessage = (messageId: number) => atom((get => get(rMessageAtom)?.[messageId]))

export const updateMessages = atom(
    null,
    (get, set, { input, user, messageId }: Potato.Composer.NewMessage<ComposerMessageInputType>) => {
        const messages = get(messagesAtom)
        const messageDate = get(rChatDateTime)

        const _new = produce(messages, draft => {
            draft.push({
                input,
                dateTimeDelta: Date.now() - (new Date(messageDate)).getTime(),
                user
            } as Potato.MessageBody<ComposerMessageInputType>)
        })

        console.log("New message:", _new)
        set(messagesAtom, _new)
    }
)
