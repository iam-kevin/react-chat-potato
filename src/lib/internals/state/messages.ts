import { atom } from 'jotai'
import { Potato } from '../../../../@types/index'

const messageContextAtom = atom<Potato.MessageContext | undefined>(undefined)

/**
 * messages of the application
 */
export const messageAtom = atom(get => get(messageContextAtom)?.messages)

/**
 * Get the message by the message id
 * @param messageId message
 */
export const getMessage = (messageId: number) => atom(get => get(messageAtom)?.[messageId])

