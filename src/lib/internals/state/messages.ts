import { atom } from 'jotai'
import { Potato } from '../../../../@types/index'

const messageContextAtom = atom<Potato.MessageContext>({
    // Initialize with empty messages
    messages: []
})

/**
 * messages of the application
 */
export const rMessageAtom = atom(get => get(messageContextAtom).messages)
export const rMessageIds = atom(get => Object.keys(get(rMessageAtom)))
/**
 * Get the message by the message id
 * @param messageId message
 */
export const getMessage = (messageId: number) => atom((get => get(rMessageAtom)?.[messageId]))

