// @flow

import React from 'react'
import AdminEditPage, { Field } from '../../components/AdminEditPage'
import processFields from './process-fields'

export default async (params: any) => {
  const newSite = await processFields(params)
  return (
    <AdminEditPage
      title="Articles"
      description="Blog posts or stories about your business."
      site={newSite}
    >
      <Field
        label="Articles"
        itemName="Article"
        name="pressCoverage.articles"
        type="array"
      >
        <Field label="Date Published" name="datePublished" type="date" />
        <Field label="URL" name="url" type="text" />
        <Field label="Publication Image" name="publicationImage" type="image" />
        <Field label="quotation" name="quotation" type="markdown" />
      </Field>
    </AdminEditPage>
  )
}
