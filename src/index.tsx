import React from 'react'
import { Provider } from 'jotai'


export default function Potato ({ children }: any) {
    return(
        <Provider>
            {children}
        </Provider>
    )
}