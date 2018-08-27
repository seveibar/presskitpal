// @flow

import React from 'react'
import AdminEditPage, { Field } from '../../components/AdminEditPage'
import processFields from './process-fields'

export default async ({ req, db }) => {
  await processFields({ req, db })
  return (
    <AdminEditPage
      title="Contact"
      description="What's the best way to reach you?"
    >
      <Field label="Text" name="contact.text" type="markdown" />
      <Field label="Contact Name" name="contact.personName" type="text" />
      <Field label="Contact Image" name="contact.personImage" type="image" />
      <Field label="Contact Email" name="contact.personEmail" type="text" />
      <Field label="Contact Phone" name="contact.personPhone" type="text" />
    </AdminEditPage>
  )
}
