![Chat Potato default Banner](resources/img/Chat%20Potato.png)

A fun project, that tries to take a different approach from community loved [react-native-gifted-chat]() when handling state and actions.

Only dependecies (hopefully) are:
  - [use-context-selector@1.3.7](https://github.com/dai-shi/use-context-selector)
  - [immer@8.0.1](https://github.com/immerjs/immer)

## Usage

```tsx
import { Potato } from 'react-chat-potato/@types';
import { PotatoChat } from 'react-chat-potato'
import { ImageComposer, TextComposer } from 'react-chat-potato/lib';


interface User {
    name: string
    avatar?: string
}

const globalChatContext: Potato.GlobalChatContext<User> = {
    dateTime: Date.now(),
    users: {
        'self': null,   // TODO: this should indicate that user can chat
        'kevin': {
            name: "Kevin James",
        },
        'brian': {
            name: "Brian Gaspar"
        }
    }
}

const messages: Potato.Messages<MessageInputType> = [
    {
        input: "Hi here, how are you doing", 
        dateTimeDelta: 129122762,
        user: 'kevin'
    },
    { 
        input: "Sent this message on Wednesday", 
        dateTimeDelta: 215617315,
        user: 'brian'
    }
]

/**
 * Composer Component details
 */
type ComposerType =
    | 'text'
    | 'image'

type MessageInputType =
    | string    // message type for text
    | string    // message type for image


const composerOptions: Potato.Composer.GlobalContext<ComposerType, MessageInputType> = {
    composerType: 'text', 
    composerOptions: {
        'text': {
            component: TextComposer,
        },
        'image': {
            component: ImageComposer,
        },
    }
}


export default function ChatBox() {
    const sendAction = async (input: Potato.Composer.NewMessage<MessageInputType>, composerType: ComposerType) => {
        console.log("Send message:", input)
        console.log("ComposerType:", composerType)

        switch (composerType) {
            case 'text': console.log(">> Text based message"); break;
            case 'image': console.log(">> Image based message"); break;
            default: console.log("DEFAULT MESSAGE TRANSFER")
        }
    }

    return (
        <PotatoChat 
            initialComposer='image'
            initialMessages={messages}
            globalChatContext={globalChatContext}
            composerConfig={composerOptions}
            sendAction={sendAction} />
    )
}

```

## License

This project uses an [MIT License](LICENSE). So take it apart, build it. Do whatever you want with this project.

But Contributions are welcomed
