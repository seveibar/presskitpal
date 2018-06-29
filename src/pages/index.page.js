// @flow

import * as React from 'react'
import Page from '../components/Page'

export default async ({ db, site }) => (
  <Page site={site}>
    <pre>{JSON.stringify(site, null, '  ')}</pre>
  </Page>
)
