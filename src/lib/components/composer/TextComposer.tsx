import { useAtom } from 'jotai'
import React, { useCallback, useState } from 'react'
import { composerAction, updateMessages } from '../../internals'
import { BaseComposer } from './index'

/**
 * Properties for the Text composer
 */
// interface TextComposerProps extends ComposerComponentProps<string> {}

export default function TextComposer () {
    const [value, setValue] = useState<string>("")
    const [sendAction] = useAtom(composerAction)
    const [, updateMessageList] = useAtom(updateMessages)

    const onSend = useCallback(() => {
        const newMessage = { input: value, user: 'self' }
        sendAction<string>(newMessage).then(() => {
            // updates the message list with a new message
            updateMessageList(newMessage)
        })

    }, [value, sendAction, updateMessageList])

    return (
        <BaseComposer className="w-full justify-start flex items-start gap-4">
            <textarea className="border w-96" value={value} onChange={(e) => setValue(e.target.value)}/>
            <button onClick={onSend} className="bg-green-700 px-4 py-2 rounded-sm">
                Send
            </button>
        </BaseComposer>
    )
}
