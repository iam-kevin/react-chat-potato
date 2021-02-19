import { createContext } from 'react'
import create, { State } from 'zustand'
import { Potato } from '../../../../@types'

/**
 * Identify the context provider 
 * for showing the chat
 */
export const PotatoContext = createContext(null)
PotatoContext.displayName = 'PotatoChatContext'

interface MessageContextState extends State, Potato.MessageContext{}
function initializeMessageStore (initialMessages: Potato.Messages) {
    return create<MessageContextState>((set, get) => ({
        messages: initialMessages
    }))
} 

/**
 * Properties for the <PotatoProvider>
 */
interface PotatoProviderProps {
    initialMessages: Potato.Messages
}

export default function PotatoProvider ({ initialMessages }: PotatoProviderProps) {
    const useMessageStore = initializeMessageStore(initialMessages)
    const messageStore = useMessageStore()
    
    return (
        // @ts-ignore
        <PotatoContext.Provider value={messageStore}>

        </PotatoContext.Provider>
    )
}
