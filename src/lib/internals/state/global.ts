/**
 * State managed across the 
 * entire chat screen
 */

import { atom } from 'jotai'
import { Potato } from '../../../../@types/index'


const globalContextAtom = atom<Potato.GlobalContext>({
    dateTime: Date.now(),
    users: {
        'self': null,   // TODO: this should indicate that user can chat
        'kevin': {
            name: "Kevin James",
        },
        'brian': {
            name: "Brian Gaspar"
        }
    }
} as Potato.GlobalContext)


// Gets the users involved in the chat
export const rUsers = atom(get => get(globalContextAtom).users)

/**
 * Gets the user by their initialized user id
 * @param userId user's id as initialized in the globalContext
 */
export const getUser = (userId: string) => atom(get => get(rUsers)[userId])

export const rChatDateTime = atom(get => get(globalContextAtom).dateTime)

