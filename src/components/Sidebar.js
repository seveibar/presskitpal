// @flow

import React from 'react'
import RouteContext from './RouteContext'

const Button = ({ children, url: buttonURL }) => (
  <RouteContext.Consumer>
    {({ site, route }: any) => (
      <a
        href={buttonURL}
        className="sidebar-button"
        style={
          route === buttonURL
            ? { backgroundColor: site.primaryColor, color: '#fff' }
            : {}
        }
      >
        {children}
      </a>
    )}
  </RouteContext.Consumer>
)

export default ({ site, route }: any) => {
  return (
    <RouteContext.Consumer>
      {({ site }: any) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            minHeight: '100vh'
          }}
        >
          <div
            style={
              site.cornerLogo
                ? {
                    width: 300,
                    height: 200,
                    backgroundImage: `url(${site.cornerLogo})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    marginBottom: 20
                  }
                : {
                    width: 300,
                    height: 200,
                    padding: 20,
                    fontSize: 24,
                    marginBottom: 20,
                    textAlign: 'center'
                  }
            }
          >
            {!site.cornerLogo && 'Your Logo'}
          </div>
          <Button url="/">About</Button>
          <Button url="/contact">Contact</Button>
          <Button url="/links">Links</Button>
          <Button url="/coverage">Press Coverage</Button>
          <Button url="/people">People</Button>
          <Button url="/images">Images</Button>
          <Button url="/videos">Videos</Button>
          <Button url="/logos">Logos</Button>
          <Button url="/testimonials">Testimonials</Button>
          <Button url="/press-releases">Press Releases</Button>
        </div>
      )}
    </RouteContext.Consumer>
  )
}
