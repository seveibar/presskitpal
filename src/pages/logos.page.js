// @flow

import * as React from 'react'
import Page from '../components/Page'
import type { PageParameters } from '../types'
import getMarkdown from '../components/markdown'
import * as colors from '@material-ui/core/colors'

export default async ({ db, site, route }: PageParameters) => (
  <Page site={site} route={route}>
    {getMarkdown('## Logos')}
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 10
      }}
    >
      {site.logos.map(({ text, url }) => (
        <div style={{ margin: 10 }}>
          <img
            src={url}
            style={{
              objectFit: 'contain',
              width: 250,
              height: 250
            }}
          />
          <div
            style={{
              fontSize: 14,
              color: '#000',
              textAlign: 'center',
              paddingTop: 8
            }}
          >
            {text}
          </div>
          <div style={{ textAlign: 'center' }}>
            <a
              style={{ textDecoration: 'none', color: colors.blue['500'] }}
              href={url}
              download={
                site.name.replace(/[^a-zA-Z]/g, '_') +
                '_' +
                url.split('/').slice(-1)[0]
              }
            >
              download
            </a>
          </div>
        </div>
      ))}
    </div>
  </Page>
)
