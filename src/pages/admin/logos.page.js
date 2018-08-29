// @flow

import React from 'react'
import AdminEditPage, { Field } from '../../components/AdminEditPage'
import processFields from './process-fields'

export default async (params: any) => {
  const newSite = await processFields(params)
  return (
    <AdminEditPage
      title="Logos"
      description="The logo of your product or company."
      site={newSite}
    >
      <Field type="image" name="cornerLogo" label="Corner Logo" />
      <Field type="array" name="logos" label="Logos" itemName="Logo">
        <Field label="Text" name="text" type="text" />
        <Field label="Image" name="url" type="image" />
      </Field>
    </AdminEditPage>
  )
}
