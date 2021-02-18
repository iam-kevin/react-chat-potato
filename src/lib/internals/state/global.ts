/**
 * State managed across the 
 * entire chat screen
 */

import { atom } from 'jotai'
import { GlobalContext } from '../../../../@types/index'

const globalContextAtom = atom<GlobalContext | undefined>(undefined)

// Gets the users involved in the chat
export const users = atom(get => get(globalContextAtom)?.users)

/**
 * Gets the user by their initialized user id
 * @param userId user's id as initialized in the globalContext
 */
export const getUser = (userId: string) => atom(get => get(globalContextAtom)?.users[userId])


