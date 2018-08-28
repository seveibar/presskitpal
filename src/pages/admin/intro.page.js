// @flow

import React from 'react'
import AdminEditPage, { Field } from '../../components/AdminEditPage'
import processFields from './process-fields'
import RouteContext from '../../components/RouteContext'

export default async (params: any) => {
  const newSite = await processFields(params)
  return (
    <AdminEditPage
      title="Address"
      description="Location of your company."
      site={newSite}
    >
      <Field label="Full Address" name="address.fullAddress" type="markdown" />
      <Field label="Text" name="address.text" type="markdown" />
    </AdminEditPage>
  )
}
