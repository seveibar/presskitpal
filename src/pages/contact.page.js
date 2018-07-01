// @flow

import * as React from 'react'
import Page from '../components/Page'
import getMarkdown from '../components/markdown'
import type { PageParameters } from '../types'
import * as colors from '@material-ui/core/colors'

export default async ({ db, site, route }: PageParameters) => (
  <Page site={site} route={route}>
    {getMarkdown(site.contact.text)}
    <div>
      <img
        src={site.contact.personImage}
        style={{
          objectFit: 'cover',
          width: 200,
          height: 200,
          borderRadius: 200
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
        {site.contact.personName}
      </div>
      <div style={{ textAlign: 'center' }}>
        <a
          style={{ textDecoration: 'none', color: colors.blue['500'] }}
          href={`mailto:${site.contact.personEmail}`}
        >
          {site.contact.personEmail}
        </a>
      </div>
    </div>
  </Page>
)
