// @flow

import * as React from 'react'
import Page from '../components/Page'
import getMarkdown from '../components/markdown'
import type { PageParameters } from '../types'

export default async ({ db, site, route }: PageParameters) => (
  <Page site={site} route={route}>
    {getMarkdown('## Videos')}
    {site.videos.map(({ url }) => (
      <div style={{ margin: 10 }}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/yGWkUFH-T0M"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        />
      </div>
    ))}
  </Page>
)
