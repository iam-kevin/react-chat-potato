import React from 'react'
import { Provider } from 'jotai'
import { PotatoProps } from '../@types/index'

export * from './lib'

export default function Potato ({ initialMessages, children }: PotatoProps) {
    return(
        <Provider>
            {children}
        </Provider>
    )
}