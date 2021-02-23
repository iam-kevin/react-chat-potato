![Chat Potato default Banner](resources/img/Chat%20Potato.png)

A fun project, that tries to take a different approach from community loved [react-native-gifted-chat]() when handling state and actions.

Only dependecies (hopefully) are:
  - [use-context-selector@1.3.7](https://github.com/dai-shi/use-context-selector)
  - [immer@8.0.1](https://github.com/immerjs/immer)

## Usage

```tsx
import { PotatoProvider, PotatoChat } from 'react-chat-potato'
import { ComposerMessageInputType } from 'react-chat-potato/lib';

function App() {
  const sendCallback = async (message: ComposerMessageInputType) => {
    console.log("Sent the message")
  }
  return (
    <div className="App">
      <PotatoProvider initialMessages={[]}>
        <PotatoChat
          initialComposer='text'
          sendCallback={sendCallback}/>
      </PotatoProvider>
    </div>
  );
}

export default App;

```

## License

This project uses an [MIT License](LICENSE). So take it apart, build it. Do whatever you want with this project.

But Contributions are welcomed
