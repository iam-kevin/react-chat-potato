import React from 'react'
import { Potato } from '../../../../@types'

/**
 * Properties for the Text composer
 */
// interface ImageComposerProps extends ComposerComponentProps<string> {}

export default function ImageComposer <TComposerType, TMessageInputType>(props: Potato.Composer.OptionComponentProps<TComposerType, TMessageInputType> ) {
    return (
        <div>
            <input type="file" />
            <div>Send the image here</div>
        </div>
    )
}
