// @flow

import React from 'react'
import AdminEditPage, { Field } from '../../components/AdminEditPage'
import processFields from './process-fields'
import RouteContext from '../../components/RouteContext'

export default async (params: any) => {
  const newSite = await processFields(params)
  return (
    <AdminEditPage
      title="Introduction"
      description="Name of your company and introduction text. Explain your company, products, story and origins."
      site={newSite}
    >
      <Field label="Name of Site" name="name" type="text" />
      <Field label="Introduction" name="about.text" type="markdown" />
    </AdminEditPage>
  )
}
