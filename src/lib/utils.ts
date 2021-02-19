import { useAtom } from "jotai"
import { ComposerComponentProps } from "./components"
import { currentComposer, getComposerInfo } from "./internals"
import { ComposerType } from './internals/state/composer'


/**
 * Gets the composer
 * If undefined, gets the current set composer
 * @param composerType 
 */
export function useComposer(composerType: ComposerType | undefined = undefined) {
    const [currentComposerType] = useAtom(currentComposer)
    let cmpType = composerType

    if (cmpType === undefined) {
        cmpType = currentComposerType
    }

    const [composer] = useAtom(getComposerInfo(cmpType))

    return composer
}

/**
 * Gets the component for rendering the composer
 * @param composerType 
 */
export function useComposerComponent<T>(composerType: ComposerType | undefined = undefined) {
    const composer = useComposer(composerType)

    // for renditions
    return composer.component
}
