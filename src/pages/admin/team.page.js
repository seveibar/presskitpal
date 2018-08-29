// @flow

import React from 'react'
import AdminEditPage, { Field } from '../../components/AdminEditPage'
import processFields from './process-fields'

export default async (params: any) => {
  const newSite = await processFields(params)
  return (
    <AdminEditPage
      title="Team"
      description="Everyone involved in your company."
      site={newSite}
    >
      <Field type="markdown" label="Text" name="people.text" />
      <Field
        label="Team Members"
        name="people.team"
        itemName="Team Member"
        type="array"
      >
        <Field label="Name" name="name" type="text" />
        <Field label="Title" name="title" type="text" />
        <Field label="Image" name="imageURL" type="image" />
      </Field>
    </AdminEditPage>
  )
}
