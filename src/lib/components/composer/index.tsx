import React from 'react'
import ImageComposer from './ImageComposer'
import TextComposer from './TextComposer'

export interface ComposerComponentProps<T> {
    sendCallback: (message: T) => Promise<void>
}

interface BaseComposerComponentProps {
    className: React.HTMLAttributes<HTMLFormElement>['className']
    children?: React.ReactNode
}

/**
 * Composer component that is defaultly used by other 
 * composer types
 */
export function BaseComposer({ children, className }: BaseComposerComponentProps ) {
    
    return (
        <div className={className}>
            {children}
        </div>
    )
}

export { ImageComposer, TextComposer }
