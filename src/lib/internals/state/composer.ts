import { Potato } from '../../../../@types'
import { createContext } from 'use-context-selector'

/**
 * These are the form of inputs that are 
 * made available for the chat
 */
export type ComposerType = 
    | 'text' 
    | 'image'

export type ComposerMessageInputType = 
    | string 
    | string
    | number


export const ComposerContext = createContext<Potato.Composer.GlobalContext | undefined>(undefined)


