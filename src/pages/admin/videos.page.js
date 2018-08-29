// @flow

import React from 'react'
import AdminEditPage, { Field } from '../../components/AdminEditPage'
import processFields from './process-fields'

export default async (params: any) => {
  const newSite = await processFields(params)
  return (
    <AdminEditPage
      title="Videos"
      description="Videos of your products or promotional content."
      site={newSite}
    >
      <Field label="Videos" itemName="Video" name="videos" type="array">
        <Field label="URL" name="url" type="text" />
      </Field>
    </AdminEditPage>
  )
}
