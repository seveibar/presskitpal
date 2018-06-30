// @flow

import * as React from 'react'
import Page from '../components/Page'
import getMarkdown from '../components/markdown'

export default async ({ db, site, route }) => (
  <Page site={site} route={route}>
    {getMarkdown(site.about.text)}
  </Page>
)
