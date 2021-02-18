import React from 'react'
import { ComposerComponentProps } from './index'

/**
 * Properties for the Text composer
 */
interface ImageComposerProps extends ComposerComponentProps {}

export default function ImageComposer({ sendAction }: ImageComposerProps) {
    return (
        <div>
            <input type="file" />
            <div>Send the image here</div>
        </div>
    )
}
