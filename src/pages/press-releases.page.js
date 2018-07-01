// @flow

import * as React from 'react'
import Page from '../components/Page'
import getMarkdown from '../components/markdown'
import type { PageParameters } from '../types'
import * as colors from '@material-ui/core/colors'

export default async ({ db, site, route }: PageParameters) => (
  <Page site={site} route={route}>
    {getMarkdown('## Press Releases')}
    <div>
      {site.pressReleases.map(({ url, title, date }) => (
        <div style={{ margin: 20 }}>
          <a
            style={{ color: colors.blue['500'], textDecoration: 'none' }}
            href={url}
          >
            <span className="serif" style={{ fontStyle: 'italic' }}>
              {title}
            </span>
            <span style={{ color: '#666' }}> {date}</span>
          </a>
        </div>
      ))}
    </div>
  </Page>
)
