// @flow

import React from 'react'
import AdminEditPage, { Field } from '../../components/AdminEditPage'
import processFields from './process-fields'

export default async (params: any) => {
  const newSite = await processFields(params)
  return (
    <AdminEditPage
      title="Account"
      description="Change account details, add other administrators."
      site={newSite}
    >
      <div style={{ textAlign: 'center', margin: 16 }}>
        Account configuration isn't currently available.
      </div>
    </AdminEditPage>
  )
}
