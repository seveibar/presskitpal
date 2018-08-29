// @flow

import React from 'react'
import AdminEditPage, { Field } from '../../components/AdminEditPage'
import processFields from './process-fields'

export default async (params: any) => {
  const newSite = await processFields(params)
  return (
    <AdminEditPage
      title="Style"
      description="Edit the colors and style of your press kit."
      site={newSite}
    >
      <Field label="Primary Color" name="primaryColor" type="text" />
    </AdminEditPage>
  )
}
