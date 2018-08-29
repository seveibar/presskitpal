// @flow

import React from 'react'
import AdminEditPage, { Field } from '../../components/AdminEditPage'
import processFields from './process-fields'

export default async (params: any) => {
  const newSite = await processFields(params)
  return (
    <AdminEditPage
      title="Images"
      description="Images of your product or pictures of your office and team."
      site={newSite}
    >
      <Field label="Images" name="images" itemName="Image" type="array">
        <Field label="Description" name="text" type="text" />
        <Field label="Image" name="url" type="image" />
      </Field>
    </AdminEditPage>
  )
}
