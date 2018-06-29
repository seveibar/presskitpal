# Express Server with React Templates

This is a **very simple** way to create a ui with api bindings built in.

Features:
* React as templating language
* Express with sensible defaults and middleware for file uploads, json body parsing, form parsing etc.
* Next.js (and PHP) inspired "place a file in a directory and it just works"
* Renders simple static html (not SPAs)

## Usage

`yarn install`

`yarn start:watch`

Visit `localhost:3003` in your browser.

## Creating Routes

Just place a JS file in the `pages` directory. It'll automatically be picked up
on the server. The name of the file becomes the route, e.g. `src/pages/somepage.js`
is visible at `http://localhost:3003/somepage`.

Here's an example route file:
```javascript
// somepage.js
import * as React from 'react'

export default () => <div>'hello world'</div>
```

Now let's do some *crazy* stuff with an api.

```javascript
// somepage.js
import { incrementCounter, getCounterValue } from './some-db-functions'
import * as React from 'react'

export default async ({ req }) => {
  const { name } = req.query
  await incrementCounter()
  const numberOfVisitors = await getCounterValue()
  return (
    <div>{ numberOfVisitors } have visited this website! Thanks for coming {name}!</div>
  )
}
```
