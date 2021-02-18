// Types in the application


export interface PotatoProps {
    initialMessages: Messages,
    children: any
}

/**
 * Information that is to the entire 
 * chat across a potato instance
 */
export declare namespace Potato {
    export interface GlobalContext {
        datetime: Date,
    
        /**
         * Users who are participating in the chat
         */
        users: Users
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
        avatar: string
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
    type Messages = Array<MessageBody>

    interface MessageBody {
        text: string,
        dateTimeDelta: number,
        user: keyof GlobalContext['users']
    }
}

