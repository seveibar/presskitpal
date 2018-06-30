// @flow

import * as React from 'react'
import Page from '../components/Page'

export default async ({ db, site, route }) => (
  <Page site={site} route={route}>
    <pre>{JSON.stringify(site, null, '  ')}</pre>
  </Page>
)
