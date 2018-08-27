// @flow

import * as React from 'react'

export default async ({  }: any) => (
  <div
    style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#eee'
    }}
  >
    <div
      style={{
        width: 300,
        padding: 10,
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: 4
      }}
    >
      <b>Page Not Found</b>
      <br />
      We couldn't find the page you were looking for. Check to make sure you
      typed the url correctly or <a href="/">click here</a> to go to the home
      page.
    </div>
  </div>
)
