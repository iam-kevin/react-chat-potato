import React from 'react'
import { ComposerComponentProps } from './index'

/**
 * Properties for the Text composer
 */
interface TextComposerProps extends ComposerComponentProps {}

export default function TextComposer ({ sendAction }: TextComposerProps) {
    return (
        <div>
            <textarea />
        </div>
    )
}
