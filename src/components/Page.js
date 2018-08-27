// @flow

import React from 'react'
import Sidebar from './Sidebar'
import RouteContext from './RouteContext'
import LargeOnly from './LargeOnly'
import SmallOnly from './SmallOnly'
import SmallHeader from './SmallHeader'

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
      <LargeOnly>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 300,
            borderRight: `2px solid ${site.primaryColor}`
          }}
        >
          <Sidebar route={route} />
        </div>
      </LargeOnly>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          flexShrink: 1,
          backgroundColor: '#eee'
        }}
      >
        <SmallOnly>
          <SmallHeader />
        </SmallOnly>
        <div className="content">{children}</div>
      </div>
    </div>
    <div style={{ flexGrow: 1, backgroundColor: '#eee' }} />
  </div>
)
