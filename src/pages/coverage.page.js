// @flow

import * as React from 'react'
import Page from '../components/Page'
import getMarkdown from '../components/markdown'
import type { PageParameters } from '../types'

export default async ({ db, site, route }: PageParameters) => (
  <Page site={site} route={route}>
    {getMarkdown('## Press Coverage')}
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 10
      }}
    >
      {site.pressCoverage.articles.map(
        ({ url, publicationImage, quotation, datePublished }) => (
          <div style={{ margin: 10, width: 250 }}>
            <a href={url}>
              <img
                style={{
                  objectFit: 'contain',
                  width: 250
                }}
                src={publicationImage}
              />
            </a>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 14,
                  paddingTop: 8,
                  paddingBottom: 8,
                  color: '#000'
                }}
              >
                "{quotation}"
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: '#666'
                }}
              >
                {datePublished}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  </Page>
)
