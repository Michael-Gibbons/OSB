# Utility Hooks

Can you tell I like custom hooks?

Well if you couldn't here is a comprehensive list of utility hooks I added to bootstrap react development. Some of them are shamelessly stolen from [WebDevSimplified](https://www.youtube.com/@WebDevSimplified).

## useDebounce

This is a hook that will not run the supplied callback function until a certain amount of time has elapsed. This is useful for search bars for example, you don't want to query your database every time a user presses a key, you want to wait until they stop typing then run the query function.

```js
import { useDebounce } from '/path/to/hooks/index.js'

const [count, setCount] = useState(1)

useDebounce(() => { alert(count) }, 1000, [count])

<Button onClick={() => setCount(count + 1)}> Click Me! </Button>

```

## useDebugInformation

This is a hook stolen from [WebDevSimplified](https://www.youtube.com/@WebDevSimplified).

It's purpose is to log out changing component information so if a component isn't working the way you expect, you can just drop this hook in instead of adding random console.logs all over the place.

See a full video describing it [here!](https://youtu.be/wvJPGUuEUPk?t=157)

## useLocalStorage

This is a hook which adds a friendly wrapper around local storage, it is used in the `usePreferences` hook. It accepts a key which is a string. And any json-stringify-able object as the default value.

```js
import { useLocalStorage } from '/path/to/hooks/index.js'

const [myCoolLsThing, setMyCoolLsThing] = useLocalStorage('MySuperCoolLocalStorageThing', {})
// {} is the default value in this example

```

?> You don't have to stringify the value, it is already stringified when it is set.

## useLogger

This is a helpful hook you should be using a lot, see the [Logging](./backend/logging) section.

All it does is send your logs to the `/api/log` endpoint to be properly handled by our server.

```js
import { useLogger } from '/path/to/hooks/index.js'

const logger = useLogger()

logger.warn('my super cool warning', {someError: 'hey this is some warning data', time: Date.now()})
logger.error('my super cool error', {someError: 'hey this is some error data', time: Date.now()})
logger.debug('my super cool debug', {someError: 'hey this is some debug data', time: Date.now()})
logger.info('my super cool info', {someError: 'hey this is some info data', time: Date.now()})
```

## usePreferences

This is another helpful hook. Sometimes you would like to have information on the user preferences without sending it to the server, since it has no use.

For example one person using your app may like the default list size to be 50 items per page, while another may like 25 items per page. Using this hook you can retrieve this data and render it according to the user's preferences.

```js
import { usePreferences } from '/path/to/hooks/index.js'

const preferences = usePreferences()

preferences.get() // gets an object containing all preferences
preferences.get("PAGE_SIZE", 25) // gets only the PAGE_SIZE preference
// if it does not exist it will create it with the value of 25
preferences.set("PAGE_SIZE", 50) // sets the PAGE_SIZE preference to 50
preferences.delete("PAGE_SIZE") // deletes the PAGE_SIZE preference

// Example usage

const preferences = usePreferences()
const [pageSize, setPageSize] = useState(preferences.get("PAGE_SIZE", 25))

const handlePageSizeChange = (newPageSize) => {
  preferences.set("PAGE_SIZE", newPageSize) // Updates preference in local storage
  setPageSize(newPageSize) // Triggers rerender in your component according to new preferences
}

```

## useServerClient

!> Super important hook

This hook is the main communication between the frontend react application, and the backend express server. Use this whenever you need to call an endpoint to your server.

The hook returns an [Axios](https://www.npmjs.com/package/axios) instance with the base url of `/api/v1`. If it detects you are not authorized or your shopify session has expired, it will redirect the user to `/api/auth` to go through the authentication flow.

```js
import { useServerClient } from '/path/to/hooks/index.js'

const serverClient = useServerClient() // Returns axios instance

serverClient.get('/products') // gets /api/v1/products

```

!> This hook should be used in tandem with `useAppQuery` and `useAppMutation`. See the [Custom Queries](./frontend/query-hooks?id=custom-queries) section

## useStateWithValidation

This is a useful hook when you want to define a state value subject to some kind of validation. For example the following code determines if an email is valid every time the setter is called.

```js

import { useStateWithValidation } from '/path/to/hooks/index.js'

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )?.length >= 1;
};

const [email, setEmail, emailIsValid] = useStateWithValidation(validateEmail, '')

if(!emailIsValid){
  // Render some sort of error
}
```

## useToggle

This is a useful hook when you are creating a boolean state value that is only used to determine the "active" state of some element.

It provides a toggle function instead of a setter. When provided no argument, it will return the logical inverse of the current value. When provided an argument, it will set the value to that argument.

```js

import { useToggle } from '/path/to/hooks/index.js'

const [active, toggleActive] = useToggle(false) // false is the default value in this example

toggleActive() // will toggle to !active, true
toggleActive() // will toggle to !active, now false
toggleActive(false) // false
toggleActive(true) // true

```

