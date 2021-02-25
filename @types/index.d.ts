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
    /**
     * Valide Composer Types
     */
    type ValidComposerTypes = string

    interface GlobalChatContext<TUser> {
        dateTime: Date | number,
    
        /**
         * Users who are participating in the chat
         */
        users: Users<TUser>
    }

    type UserType = 'self' | string
    
    interface Users<TUser> {
        // If present, it means that this user is present and can type something 
        'self'?: null,
    
        /**
         * These match the users 
         * that are in the chat
         */
        [userId: string]: TUser | null | undefined
    }


    /**
     * Context for the messages
     */
    interface MessageContext<TMessageType> {
        messages: Messages<TMessageType>
    }

    /**
     * Load the messages:
     * { [messageId: number]: messageBody }
     */
    type Messages<T> = Array<MessageBody<T>>
    

    /**
     * Entire Global Context Type
     */
    export interface GlobalContext<TUser, TMessageType> extends GlobalChatContext<TUser>, MessageContext<TMessageType> {}


    interface MessageBody<T> {
        input: T,
        dateTimeDelta: number,
        user: UserType
    }


    interface MessageComponentProps{
        // identifier of the message
        messageId: number
    }

    type ComposerOption<TComposerType, TComposerInputType> = {
        [type: TComposerType]: OptionProps<TComposerInputType>
    }

    namespace Composer {
        interface GlobalContext<TComposerType, TComposerInputType> {
            composerType: TComposerType,
            composerOptions: ComposerOption<TComposerType, TComposerInputType>
        }


        export interface OptionComponentProps<TComposerType, TComposerInputType> {
            sendAction: <T extends TComposerInputType> (input: Potato.Composer.NewMessage<T>, composerType: TComposerType, updateMessageList: (input: Potato.Composer.NewMessage<T>) => void) => Promise<void>,
        }


        interface OptionProps<TComposerType, TComposerInputType> {
            component: (props: OptionComponentProps<TComposerType, TComposerInputType>) => JSX.Element
        }


        interface NewMessage<T> {
            input: T,
            user: UserType,
            messageId?: MessageComponentProps['messageId']
        }
    }

}

