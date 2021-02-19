import { Atom, atom } from 'jotai'
import { Potato } from '../../../../@types'
import { TextComposer, ImageComposer } from '../../components/composer'

import { updateMessages } from './messages'

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

interface GlobalComposerContext {
    composerType: ComposerType,
    sendAction: <T> (input: Potato.Composer.NewMessage<T>) => Promise<void>
}

// @ts-ignore
export const globalComposerContext = atom<GlobalComposerContext>({
    composerType: 'text',    // default composer 'text' | options 'text', 'image',
    sendAction: async <T> (input: Potato.Composer.NewMessage<T>) => {
        return;
    }
})

/**
 * actions that the composer does to update the states
 * within the chat. This included the message board and any
 * other activities
 */
export const composerUpdateAction = atom(null,
    async (get, set, newMessage: Potato.Composer.NewMessage<ComposerMessageInputType>) => {
        // Update the message list
        //  with a new message
        set(updateMessages, newMessage)
    }
)


/**
 * Composer Component details
 */
interface Composer {
    component: () => JSX.Element
}

type ComposerMap = { [type in ComposerType]: Atom<Composer> }

// You might want to move this to the BaseComposer
const composerMap: ComposerMap = {
    'text': atom<Composer>({ 
        component: TextComposer,
    }),
    'image': atom<Composer>({ 
        component: ImageComposer,
    }),
}

/**
 * Get the composer type
 * @param composerType Composer type
 */
export const getComposerInfo = (composerType: ComposerType) => composerMap[composerType]
export const currentComposer = atom(get => get(globalComposerContext).composerType)
export const composerAction = atom(get => get(globalComposerContext).sendAction)

