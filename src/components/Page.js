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
        width: '100%',
        display: 'flex',
        flexGrow: 1,
        flexShrink: 1,
        flexDirection: 'row'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 300,
          borderRight: `2px solid ${site.primaryColor}`
        }}
      >
        <Sidebar site={site} route={route} />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          flexShrink: 1,
          backgroundColor: '#eee'
        }}
      >
        <div className="content">{children}</div>
      </div>
    </div>
    <div style={{ flexGrow: 1, backgroundColor: '#eee' }} />
  </div>
)
