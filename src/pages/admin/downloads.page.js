// @flow

import React from 'react'
import AdminEditPage, { Field } from '../../components/AdminEditPage'
import processFields from './process-fields'

export default async (params: any) => {
  const newSite = await processFields(params)
  return (
    <AdminEditPage
      title="Downloads"
      description="Anything else reporters should be able to download."
      site={newSite}
    >
      <Field
        label="Downloads"
        itemName="Download"
        name="downloads"
        type="array"
      >
        <Field label="Description" name="description" type="text" />
        <Field label="File" name="file" type="file" />
      </Field>
    </AdminEditPage>
  )
}
