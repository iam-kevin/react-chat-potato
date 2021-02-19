![Chat Potato default Banner](resources/img/Chat%20Potato.png)

A fun project, that tries to take a different approach from community loved [react-native-gifted-chat]() when handling state and actions.

Only dependecies (hopefully) are:
  - [react@17.0.1](https://github.com/facebook/react)
  - [jotai@0.14.1](https://github.com/pmndrs/jotai)

## Usage

```tsx
import { PotatoProvider, PotatoChat } from 'react-chat-potato'

export default function App () {
    // message are loaded somewhere
    const messages = [...]

    return (
        <PotatoProvider initialMessages={[]}>
            <PotatoChat 
                defaultComposer='text'
                sendAction={(newInput) => {
                    console.log("You have sent a new message")
                    console.log(newInput.input)
                }} />
        </PotatoProvider>
    )
}
```

## License

This project uses an [MIT License](LICENSE). So take it apart, build it. Do whatever you want with this project
