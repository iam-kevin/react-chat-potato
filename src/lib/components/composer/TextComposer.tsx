import React, { useState } from 'react'
import { BaseComposer } from './index'
import { useSendCallback } from '../../utils'
import { Potato } from '../../../../@types'


export default function TextComposer <TComposerType, TMessageInputType>({ composerType, sendAction }: Potato.Composer.OptionComponentProps<TComposerType, TMessageInputType>) {
    const [value, setValue] = useState<string>("")
    const onSend = useSendCallback(value, composerType, sendAction)

    return (
        <BaseComposer className="w-full justify-start flex items-start gap-4">
            <textarea className="border w-96" value={value} onChange={(e) => setValue(e.target.value)}/>
            <button onClick={onSend} className="bg-green-700 px-4 py-2 rounded-sm">
                Send
            </button>
        </BaseComposer>
    )
}
