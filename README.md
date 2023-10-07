# sortable-list

## Tech stack

- Vue 3
- TypeScript
- Vuetify
- Pinia
- Vitest

## What I did extra

- not allowing duplicate actions to appear
- handling API call failure in the UI
- mobile friendly UI

## What could be done further

- drag'n'drop implemented with [Vue Draggable](https://github.com/SortableJS/vue.draggable.next)
- I was actually thinking about adding some way of preserving actions, even after refreshing but - it actually made no sense. For example if I would preserve actions in local storage, then let's say some posts would be deleted from the server and after getting those preserved action the `Time travel` would cause problems as some posts from saved snapshot could not exist anymore but as I write it I'm thinking that I could filter out not existent post related actions before displaying those actions from local storage :)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Running unit tests

```sh
npm run test:unit
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
