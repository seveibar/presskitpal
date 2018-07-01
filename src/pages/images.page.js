// @flow

import * as React from 'react'
import Page from '../components/Page'
import getMarkdown from '../components/markdown'
import type { PageParameters } from '../types'
import * as colors from '@material-ui/core/colors'

export default async ({ db, site, route }: PageParameters) => (
  <Page site={site} route={route}>
    {getMarkdown('## Images')}
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 10
      }}
    >
      {site.images.map(img => (
        <div style={{ margin: 10 }}>
          <img
            style={{
              objectFit: 'cover',
              width: 400,
              height: 400
            }}
            src={img.url}
          />
          <div style={{ textAlign: 'center', padding: 5 }}>
            <div
              style={{
                fontSize: 14,
                color: '#333',
                padding: 2
              }}
            >
              {img.text}
            </div>
            <div>
              <a
                style={{ color: colors.blue['500'], textDecoration: 'none' }}
                href={img.url}
                download={
                  site.name.replace(/[^a-zA-Z]/g, '_') +
                  '_' +
                  img.url.split('/').slice(-1)[0]
                }
              >
                download
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Page>
)
