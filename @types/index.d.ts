// Types in the application

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
}

