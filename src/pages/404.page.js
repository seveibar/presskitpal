// @flow

import * as React from 'react'

export default ({ pages }: any) => (
  <div>
    <h2>Pages:</h2>
    {pages &&
      pages.map(page => (
        <div key={page}>
          <a href={`/${page}`}>{page}</a>
        </div>
      ))}
  </div>
)
