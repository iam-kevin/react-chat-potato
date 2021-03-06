![Chat Potato default Banner](resources/img/Chat%20Potato.png)

A fun project, that tries to take a different approach from community loved [react-native-gifted-chat]() when handling state and actions.

Only dependecies (hopefully) are:
  - [use-context-selector@1.3.7](https://github.com/dai-shi/use-context-selector)
  - [immer@8.0.1](https://github.com/immerjs/immer)

```bash
yarn add react-chat-potato
```

## Underlying Concepts and Principles

### Concepts:
Building this project, there are differnent things that are taken to consideration when building a chat.
It's that:
-  You want to know the information around the general conversation (global context)
- You want to be able to show messages accounting for different types (text, images, videos, signature, whatever else that might popup in the future...)
- You want to be able to use different inputting methods for different types of data

This packages tries to get close to addressing some these things by building around having 3 things, which are being internally supported within this project:
- Global Context
- MessageCanvas
- ComposerBox

![Global-MessageCanvas-ComposerBox](/resources/img/chat-potato-concept.png)

(...more on these later)

Principles:
- Modularity and high customizability (using inner component through use of hooks)
- Nothing is served for primary use (though there are things that are provided as example components)
- Can be used with both `React` and `ReactNative` environments

## Things to try to play around with: 
(I should probably move this to Github Project)

- [x] **Enabling Customizable Composers**: You are able to build composer components depending on your use case. For instance: text area for text input, custom audio mic for audio input. See Usage example
    
    
- [x] publish version `0.1.x` (current `0.3.x`)
- [x] Wrapping with placeholder view component (not to pick sides btn RJS / RN) 
- [x] Adding a default components package with theme
- [x] Support TypeScript
- [ ] Using delta datetime _[on progress]_ (and having only one reference for time)

## Usage

Check out the repo with template for chat interfaces created with `react-chat-potato`
Templates: [https://github.com/iam-kevin/chat-potato-templates](https://github.com/iam-kevin/chat-potato-templates)

## License

MIT
