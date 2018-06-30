// @flow

import React from 'react'
import Sidebar from './Sidebar'

export default ({ site, children, route }: any) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ flexGrow: 1 }} />
    <div
      style={{
        flexShrink: 1,
        maxWidth: 1400,
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 300
        }}
      >
        <Sidebar site={site} route={route} />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          backgroundColor: '#eee'
        }}
      >
        {children}
      </div>
    </div>
    <div style={{ flexGrow: 1, backgroundColor: '#eee' }} />
  </div>
)
