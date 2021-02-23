import React, { useCallback, useState } from 'react'
import { BaseComposer, ComposerComponentProps } from './index'
import { useComposerContext, useMessageUpdater } from '../../utils'

/**
 * Properties for the Text composer
 */

export default function TextComposer ({ sendCallback }: ComposerComponentProps<string>) {
    const [value, setValue] = useState<string>("")
    const sendAction = useComposerContext(state => state.sendAction)

    // the message context is missing
    // const [, updateMessageList] = useAtom(updateMessages)
    const updateMessageList = useMessageUpdater()

    const onSend = useCallback(() => {
        const newMessage = { input: value, user: 'self' }
        sendCallback(value)
            .then(() => sendAction<string>(newMessage))
            .then(() => {
                // updates the message list with a new message
                updateMessageList(newMessage)
            })
    }, [value, sendAction, updateMessageList, sendCallback])

    return (
        <BaseComposer className="w-full justify-start flex items-start gap-4">
            <textarea className="border w-96" value={value} onChange={(e) => setValue(e.target.value)}/>
            <button onClick={onSend} className="bg-green-700 px-4 py-2 rounded-sm">
                Send
            </button>
        </BaseComposer>
    )
}
