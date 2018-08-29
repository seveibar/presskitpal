// @flow

import React from 'react'
import AdminEditPage, { Field } from '../../components/AdminEditPage'
import processFields from './process-fields'

export default async (params: any) => {
  const newSite = await processFields(params)
  return (
    <AdminEditPage
      title="Domain"
      description="Add a custom domain."
      site={newSite}
    >
      <div style={{ textAlign: 'center', margin: 16 }}>
        Domain configuration isn't currently available.
      </div>
    </AdminEditPage>
  )
}
