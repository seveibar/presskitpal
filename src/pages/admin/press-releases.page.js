// @flow

import React from 'react'
import AdminEditPage, { Field } from '../../components/AdminEditPage'
import processFields from './process-fields'

export default async (params: any) => {
  const newSite = await processFields(params)
  return (
    <AdminEditPage
      title="Press Releases"
      description="Links to your latest press releases."
      site={newSite}
    >
      <Field
        label="Press Releases"
        type="array"
        itemName="Press Release"
        name="pressReleases"
      >
        <Field label="URL" name="url" type="text" />
        <Field label="Title" name="title" type="text" />
        <Field label="Date" name="date" type="date" />
      </Field>
    </AdminEditPage>
  )
}
