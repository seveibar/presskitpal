// @flow

import React from 'react'
import AdminEditPage, { Field } from '../../components/AdminEditPage'
import processFields from './process-fields'

export default async (params: any) => {
  const newSite = await processFields(params)
  return (
    <AdminEditPage
      title="Import & Export"
      description="Export or import your press kit."
      site={newSite}
    >
      <div style={{ textAlign: 'center', margin: 16 }}>
        Import/export isn't currently available!
      </div>
    </AdminEditPage>
  )
}
