// @flow

import React, { createContext } from 'react'
import type { PageParameters } from '../types'

export const RouteContext = createContext()

export const wrapWithRouteContext = (
  params: PageParameters,
  component: any
) => <RouteContext.Provider value={params}>{component}</RouteContext.Provider>

export default RouteContext
