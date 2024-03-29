// @flow

import React, { Fragment } from 'react'
import RouteContext from '../RouteContext'

import getWithin from 'lodash/get'
import textareaAutoExpandSnippet from './textarea-auto-expand'

export const FieldContext = React.createContext()

export const FieldLabel = ({ children }) => (
  <div
    style={{
      textTransform: 'uppercase',
      fontSize: 11,
      fontWeight: 600,
      color: '#666',
      paddingLeft: 5
    }}
  >
    {children}
  </div>
)

type FieldProps = {
  label: string,
  type: 'array' | 'markdown' | 'text' | 'image' | 'choice' | 'date' | 'file',
  itemName?: string,
  value?: any,
  choices?: Array<string>,
  name: string,
  children?: any
}
export const Field = ({
  label,
  type,
  value,
  name,
  children,
  choices,
  itemName
}: FieldProps) =>
  type === 'array' ? (
    <RouteContext.Consumer>
      {(rc = {}) => (
        <Fragment>
          {label && <FieldLabel>{label}</FieldLabel>}
          {getWithin(rc.site, name).map((v, index) => (
            <FieldContext.Provider
              key={index}
              value={{ name, itemName, index }}
            >
              <div style={{ border: '2px solid #888', marginTop: 16 }}>
                <div
                  style={{ display: 'flex', paddingRight: 8, paddingLeft: 8 }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 'bold',
                      color: '#fff',
                      backgroundColor: '#888',
                      paddingLeft: 8,
                      paddingRight: 8,
                      paddingTop: 4,
                      paddingBottom: 0
                    }}
                  >
                    {itemName} {index + 1}
                  </span>
                  <div style={{ flexGrow: 1 }} />
                  {index !== 0 && (
                    <button
                      className="link-button"
                      name={`${name}[${index}]_action`}
                      value="moveup"
                      type="submit"
                    >
                      up
                    </button>
                  )}
                  {getWithin(rc.site, name).length - 1 !== index && (
                    <button
                      className="link-button"
                      name={`${name}[${index}]_action`}
                      value="movedown"
                      type="submit"
                    >
                      down
                    </button>
                  )}
                  <button
                    className="link-button"
                    name={`${name}[${index}]_action`}
                    value="delete"
                    type="submit"
                  >
                    delete
                  </button>
                </div>
                {children}
              </div>
            </FieldContext.Provider>
          ))}
          <div style={{ marginTop: 5 }}>
            <button type="submit" name={`${name}_action`} value="new">
              Add New {itemName}
            </button>
          </div>
        </Fragment>
      )}
    </RouteContext.Consumer>
  ) : (
    <FieldContext.Consumer>
      {arrayProps => {
        const fullName = arrayProps
          ? `${arrayProps.name}[${arrayProps.index}]${name}`
          : name
        return (
          <RouteContext.Consumer>
            {({ site } = {}) => (
              <div style={{ marginTop: 10 }}>
                <FieldLabel>
                  {label}
                  {type === 'markdown' && ' (markdown)'}
                </FieldLabel>
                {type === 'text' && (
                  <input
                    type="text"
                    name={fullName}
                    value={
                      value !== undefined ? value : getWithin(site, fullName)
                    }
                  />
                )}
                {type === 'markdown' && (
                  <textarea
                    className="autoExpand"
                    style={{ overflow: 'hidden' }}
                    rows={Math.max(
                      5,
                      (value || getWithin(site, fullName) || '').split('\n')
                        .length
                    )}
                    data-min-rows="5"
                    name={fullName}
                    value={value || getWithin(site, fullName)}
                  />
                )}
                {type === 'choice' && (
                  <div style={{ paddingLeft: 4, marginTop: 2 }}>
                    <select value={value || getWithin(site, fullName) || ''}>
                      <option value="">none</option>
                      {(choices || []).map(choice => (
                        <option key={choice} value={choice}>
                          {choice}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {type === 'date' && (
                  <input
                    type="date"
                    name={fullName}
                    value={value || getWithin(site, fullName)}
                  />
                )}
                {type === 'file' && (
                  <Fragment>
                    <div style={{ fontSize: 12, padding: 10 }}>
                      {getWithin(site, fullName) ? (
                        <a href={getWithin(site, fullName)}>
                          {getWithin(site, fullName)}
                        </a>
                      ) : (
                        'No File Uploaded'
                      )}
                    </div>
                    <input type="file" name={fullName} />
                  </Fragment>
                )}
                {type === 'image' && (
                  <div>
                    {getWithin(site, fullName) ? (
                      <img
                        style={{
                          marginTop: 4,
                          marginLeft: 4,
                          maxWidth: 200,
                          maxHeight: 200
                        }}
                        src={getWithin(site, fullName)}
                      />
                    ) : (
                      <div style={{ fontSize: 12, padding: 10 }}>
                        <br />
                        No Image Uploaded
                      </div>
                    )}
                    <br />
                    <input type="file" name={fullName} />
                    <br />
                  </div>
                )}
                <input type="hidden" name={`${fullName}_type`} value={type} />
              </div>
            )}
          </RouteContext.Consumer>
        )
      }}
    </FieldContext.Consumer>
  )

export default ({ title, description, children, site: modifiedSite }) => (
  <RouteContext.Consumer>
    {(params = {}) => (
      <RouteContext.Provider
        value={{ ...params, site: modifiedSite || params.site }}
      >
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
              width: 500,
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
            <form method="POST" encType="multipart/form-data">
              <FieldContext.Provider value={null}>
                <div style={{ marginTop: 20 }}>{children}</div>
                <div>
                  <input type="hidden" name="field_upload" value="true" />
                  <input type="submit" />
                </div>
              </FieldContext.Provider>
            </form>
          </div>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: textareaAutoExpandSnippet
          }}
        />
      </RouteContext.Provider>
    )}
  </RouteContext.Consumer>
)
