// @flow

import React from 'react'
import AdminEditPage, { Field } from '../../components/AdminEditPage'
import processFields from './process-fields'

export default async (params: any) => {
  const newSite = await processFields(params)
  return (
    <AdminEditPage
      title="Testimonials"
      description="Things your customers are saying about you."
      site={newSite}
    >
      <Field
        name="testimonials"
        type="array"
        label="Testimonials"
        itemName="Testimonial"
      >
        <Field name="text" label="Quote" type="markdown" />
        <Field name="author" label="Author" type="text" />
      </Field>
    </AdminEditPage>
  )
}
