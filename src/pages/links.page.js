// @flow

import * as React from 'react'
import Page from '../components/Page'
import getMarkdown from '../components/markdown'
import type { PageParameters } from '../types'
import * as colors from '@material-ui/core/colors'
import { SocialIcon } from 'react-social-icons'

export default async ({ db, site, route }: PageParameters) => (
  <Page site={site} route={route}>
    {getMarkdown('## Links')}
    <div
      style={{ flexWrap: 'wrap', display: 'flex', justifyContent: 'center' }}
    >
      {site.links.map(({ type, url }) => (
        <div style={{ margin: 10, width: 400 }}>
          <SocialIcon url={url} />
          <a
            style={{
              color: colors.blue['500'],
              textDecoration: 'none',
              paddingLeft: 16
            }}
            href={url}
          >
            {url.replace(/https?:\/\//, '')}
          </a>
        </div>
      ))}
    </div>
  </Page>
)
