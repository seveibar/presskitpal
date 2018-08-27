// @flow

import React from 'react'
import RouteContext from './RouteContext'

import getWithin from 'lodash/get'

export const Field = ({ label, type, value, name }) => (
  <RouteContext.Consumer>
    {({ site } = {}) => (
      <div style={{ marginTop: 10 }}>
        <div
          style={{
            textTransform: 'uppercase',
            fontSize: 11,
            fontWeight: 600,
            color: '#666',
            paddingLeft: 5
          }}
        >
          {label}
          {type === 'markdown' && ' (markdown)'}
        </div>
        {type === 'text' && (
          <input
            type="text"
            name={name}
            value={value !== undefined ? value : getWithin(site, name)}
          />
        )}
        {type === 'markdown' && (
          <textarea
            name={name}
            style={{ minHeight: 200 }}
            value={value || getWithin(site, name)}
          />
        )}
        <input type="hidden" name={`${name}_type`} value={type} />
      </div>
    )}
  </RouteContext.Consumer>
)

export default ({ title, description, children }) => (
  <div
    style={{
      display: 'flex',
      minWidth: '100vw',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#eee',
      padding: 20
    }}
  >
    <div
      style={{
        display: 'flex-inline',
        minWidth: 400,
        padding: 10,
        borderRadius: 5,
        border: '1px solid #ddd',
        backgroundColor: '#fff'
      }}
    >
      <div>
        <a href="./">Back to Admin Panel</a>
      </div>
      <div style={{ marginTop: 20, fontSize: 24, fontWeight: 'bold' }}>
        {title}
      </div>
      <div style={{ color: '#666' }}>{description}</div>
      <form method="POST">
        <div style={{ marginTop: 20 }}>{children}</div>
        <div>
          <input type="hidden" name="field_upload" value="true" />
          <input type="submit" />
        </div>
      </form>
    </div>
  </div>
)
