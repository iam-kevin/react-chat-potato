import React from 'react'

function Component () {
    return (
        <div>
            Something is here
        </div>
    )
}

export default () => (
    <React.StrictMode>
        <Component />
    </React.StrictMode>
)