// @flow

import * as React from 'react'
import Page from '../components/Page'
import getMarkdown from '../components/markdown'
import type { PageParameters } from '../types'

export default async ({ db, site, route }: PageParameters) => (
  <Page site={site} route={route}>
    {getMarkdown('## Testimonials')}
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 10
      }}
    >
      {site.testimonials.map(({ text, author }) => (
        <div style={{ width: 400, margin: 20 }}>
          <div>"{text}"</div>
          {author && (
            <div
              style={{
                color: '#666',
                fontSize: 14,
                fontWeight: 'bold',
                textAlign: 'right'
              }}
            >
              - {author}
            </div>
          )}
        </div>
      ))}
    </div>
  </Page>
)
