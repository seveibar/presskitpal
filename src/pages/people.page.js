// @flow

import * as React from 'react'
import Page from '../components/Page'
import type { PageParameters } from '../types'
import getMarkdown from '../components/markdown'

export default async ({ db, site, route }: PageParameters) => (
  <Page site={site} route={route}>
    <div>{getMarkdown(site.people.text)}</div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 10
      }}
    >
      {site.people.team.map(t => (
        <div style={{ margin: 10, width: 200 }}>
          <a
            href={t.imageURL}
            download={
              (site.name + ' ' + t.name).replace(/[^a-zA-Z]/g, '_') +
              '.' +
              t.imageURL.split('.').slice(-1)[0]
            }
          >
            <img
              style={{
                objectFit: 'cover',
                width: 200,
                height: 200,
                borderRadius: 100
              }}
              src={t.imageURL}
            />
          </a>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: 20,
                paddingTop: 8,
                color: '#000'
              }}
            >
              {t.name}
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: '#666'
              }}
            >
              {t.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  </Page>
)
