import { atom } from 'jotai'
import produce from 'immer'

import { Potato } from '../../../../@types/index'
import { rChatDateTime } from './global'
import { ComposerMessageInputType } from './composer'

export const messagesAtom = atom<Potato.Messages>([
    { 
        input: "Hi here, how are you doing", 
        dateTimeDelta: 129122762,
        user: 'kevin'
    } as Potato.MessageBody<string>,
    { 
        input: "Sent this message on Wednesday", 
        dateTimeDelta: 215617315,
        user: 'kevin'
    } as Potato.MessageBody<string>
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
        const originDate = get(rChatDateTime)

        const _new = produce(messages, draft => {
            draft.push({
                input,
                dateTimeDelta: Date.now() - (new Date(originDate)).getTime(),
                user
            } as Potato.MessageBody<ComposerMessageInputType>)
        })

        set(messagesAtom, _new)
    }
)
