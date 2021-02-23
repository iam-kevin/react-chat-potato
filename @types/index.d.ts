// Types in the application


export interface PotatoProviderProps {
    children: any
}

export interface PotatoChatProps {
    initialMessages: Messages,
}

/**
 * Information that is to the entire 
 * chat across a potato instance
 */
export declare namespace Potato {
    export interface GlobalContext {
        dateTime: Date | number,
    
        /**
         * Users who are participating in the chat
         */
        users: Users

        /**
         * Messages
         */
        messages: Messages
    }
    
    interface Users {
        // If present, it means that this user is present and can type something 
        'self'?: null,
    
        /**
         * These match the users 
         * that are in the chat
         */
        [userId: string]: User | null | undefined
    }
    
    /**
     * Describes the user participating in the chat
     */
    interface User {
        name: string,
        avatar?: string
    }


    /**
     * Context for the messages
     */
    interface MessageContext {
        messages: Messages
    }

    /**
     * Load the messages:
     * { [messageId: number]: messageBody }
     */
    type Messages = { [messageId: string]: MessageBody }

    interface MessageBody<MessageInputType> {
        input: MessageInputType,
        dateTimeDelta: number,
        user: keyof GlobalContext['users']
    }

    namespace Composer {
        interface GlobalContext {
            composerType: ComposerType,
            sendAction: <T> (input: Potato.Composer.NewMessage<T>) => Promise<void>,
            composerOptions?: any
        }

        interface NewMessage<T> {
            input: T,
            user: 'self' | string,
            messageId?: string | number
        }
    }

}

