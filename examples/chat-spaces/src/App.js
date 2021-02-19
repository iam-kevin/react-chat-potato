import 'react-chat-potato/dist/css/index.css'
import { PotatoChat, PotatoProvider } from 'react-chat-potato'

function App() {
  return (
    <div>
      <PotatoProvider>
        <PotatoChat 
          initialMessages={[]}/>    
      </PotatoProvider>
    </div>
  );
}

export default App;
