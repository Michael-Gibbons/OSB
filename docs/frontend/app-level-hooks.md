# App Level Hooks

These hooks are designed for use throughout your location. Most of them simply pass in their input to their corresponding App Level component, which passes it to Polaris. So if you have an error with these hooks, its likely that your input is malformed. See the [polaris](https://polaris.shopify.com/components) documentation if you are having trouble.

The following is a list of hooks, their inputs, and usage. You can also see this on the [Cheat Sheet Page](./frontend/cheat-sheet.md) in the actual application.

All hooks are exported from `web/frontend/hooks/index.js`

## useBanner

```js
import { useBanner } from '/path/to/hooks/index.js'

const [setBanner] = useBanner()

const yourHandlerFunction = () => {
  // some logic

  // Accepts banner input from polaris
  setBanner({
    active: true,
    title: 'Super Cool Banner'
  })
}

```

## useContextualSaveBar

```js
import { useContextualSaveBar } from '/path/to/hooks/index.js'

const [setContextualSaveBar, setIsDirty] = useContextualSaveBar()

const yourHandlerFunction = () => {
  // some logic

  // Accepts contextual save bar input from polaris, and an isDirty property
  setContextualSaveBar({
    isDirty: true,// Determines if save bar is visible
    message: "My Cool Message",
    saveAction: {
      content: "Save",
      onAction: () => console.log('stinky')
    },
    discardAction: {
      content: "Discard",
      onAction: () => { console.log('discard'); setIsDirty(false) },
    }
  })

  setIsDirty(true)// Determines if save bar is visible
}
```

!> All properties not defined when using `setContextualSaveBar` will be reset to the default! This is to prevent unintended side effects like someone forgetting to clear out the `onAction` functions

?> Using `setIsDirty` will **not** overwrite the contextual save bar, this is for ease of use, since you can just check if your inputs deviate from the default values and set the boolean accordingly, instead of having to redefine the `onAction` functions in multiple places.

## useLoading

```js
import { useLoading } from '/path/to/hooks/index.js'

const [setLoading] = useLoading()

const yourHandlerFunction = () => {
  // some logic

  setLoading(true)
  // Do a thing
  setLoading(false)

}

```

## useModal

```js
import { useModal } from '/path/to/hooks/index.js'

const [setModal, toggleModal] = useModal()

const yourHandlerFunction = () => {
  // some logic

  setModal({// accepts polaris input + open property
    open: true,// determines if modal is visible
    title: "This is a super cool modal, isn't it?",
    primaryAction: {
      content: 'Proceed',
      onAction: () => console.log('do super cool thing'),
    },
    secondaryActions: [
      {
        content: 'Cancel',
        onAction: () => toggleModal(false),
      },
    ],
    children: <div>My super cool modal</div>
  })
}
```

!> All properties not defined when using `setModal` will be reset to the default! This is to prevent unintended side effects like someone forgetting to clear out the `onAction` functions

?> Using `toggleModal` will **not** overwrite the modal, this is for ease of use, since you can just declare the modal once and open/close it instead of having to redefine the `onAction` functions in multiple places.

## useToast

```js
import { useToast } from '/path/to/hooks/index.js'

const [setToast] = useToast()

const yourHandlerFunction = () => {
  // some logic

  setToast({ content: 'Yo yo', error: true }) // Accepts polaris input
}
```

## useSettings

This hook requires a little explanation. It uses react-query to query the `/api/v1/settings` endpoint and returns 2 functions, 1 that contains the settings data, and 1 that provides a setter function which mutates the data.

The hooks that comprise this hook are `useAppQuery` and `useAppMutation` which are further discussed in the "Query Hooks" section.

It accepts two optional parameters, the react-query options for the query used to retrieve the data and the react-query options for the mutation used to modify the data.

```js
import { useSettings } from '/path/to/hooks/index.js';

const [shopSettings, saveSettings] = useSettings(reactQueryOptions, reactQueryMutationOptions)

// You likely don't want to use saveSettings any place other than the settings page, so most of the time your hook should look like this

const [shopSettings] = useSettings()

if(shopSettings.mySuperCoolSetting){
  // Do super cool thing based on setting.
}

```

## Utility hooks

You may be curious what the hooks in `/web/backend/hooks/app/util` are used for, those are the hooks used in the app frame component used to instantiate the resource. You should not use this directly.