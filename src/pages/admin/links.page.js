// @flow

import React from 'react'
import AdminEditPage, { Field } from '../../components/AdminEditPage'
import processFields from './process-fields'
import RouteContext from '../../components/RouteContext'

export default async (params: any) => {
  const newSite = await processFields(params)
  return (
    <AdminEditPage
      title="Links"
      description="Your twitter, blog, LinkedIn, etc."
      site={newSite}
    >
      <Field name="links" label="Links" type="array" itemName="Link">
        <Field
          label="Type of Link"
          name="type"
          type="choice"
          choices={[
            'youtube',
            'linkedin',
            'blog',
            'medium',
            'twitter',
            'instagram',
            'facebook',
            'crunchbase',
            'angellist',
            'website',
            'other'
          ]}
        />
        <Field label="URL" name="url" type="text" />
      </Field>
    </AdminEditPage>
  )
}
