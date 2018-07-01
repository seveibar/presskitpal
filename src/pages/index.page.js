// @flow

import * as React from 'react'
import Page from '../components/Page'
import getMarkdown from '../components/markdown'
import type { PageParameters } from '../types'

export default async ({ db, site, route }: PageParameters) => (
  <Page site={site} route={route}>
    {getMarkdown(site.about.text)}
  </Page>
)
