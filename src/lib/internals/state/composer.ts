import { Atom, atom } from 'jotai'
import { TextComposer, ImageComposer } from '../../components/composer'

/**
 * These are the form of inputs that are 
 * made available for the chat
 */
type ComposerType = 'text' | 'image'

interface GlobalComposerContext {
    composerType: ComposerType,
}

// @ts-ignore
const globalComposerContext = atom<GlobalComposerContext>({
    composerType: 'text',    // default composer 'text' | options 'text', 'image',
    sendAction: () => console.log('Message has bee sent')
})


/**
 * Composer Component details
 */
interface Composer {
    component: () => JSX.Element
}

type ComposerMap = { [type in ComposerType]: Atom<Composer> }

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
