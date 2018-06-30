// @flow

import React from 'react'
import showdown from 'showdown'

const converter = new showdown.Converter()

export default (mdText: string) => (
  <div
    className="markdown"
    dangerouslySetInnerHTML={{
      __html: converter.makeHtml(mdText)
    }}
  />
)
