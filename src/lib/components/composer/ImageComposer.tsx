import React from 'react'
import { ComposerComponentProps } from './index'

/**
 * Properties for the Text composer
 */
// interface ImageComposerProps extends ComposerComponentProps<string> {}

export default function ImageComposer(props: ComposerComponentProps<string> ) {
    return (
        <div>
            <input type="file" />
            <div>Send the image here</div>
        </div>
    )
}
