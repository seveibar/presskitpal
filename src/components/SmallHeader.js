// @flow

import React from 'react'
import RouteContext from './RouteContext'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import SmallOnly from './SmallOnly'

const Button = ({ url, children }) => (
  <RouteContext.Consumer>
    {({ site, route } = {}) => (
      <a style={{ color: '#333', textDecoration: 'none' }} href={url}>
        <div
          className="header-button"
          style={
            route === url
              ? {
                  backgroundColor: site.primaryColor,
                  color: '#fff',
                  cursor: 'pointer'
                }
              : { cursor: 'pointer' }
          }
        >
          {children}
        </div>
      </a>
    )}
  </RouteContext.Consumer>
)

export default () => (
  <RouteContext.Consumer>
    {({ site, route } = {}) => (
      <div
        id="small-header"
        className="menu-closed"
        style={{
          position: 'relative',
          backgroundColor: '#fff',
          width: '100%',
          borderBottom: '1px solid #ddd'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <div
            style={
              site.cornerLogo
                ? {
                    width: 200,
                    height: 80,
                    backgroundImage: `url(${site.cornerLogo})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                  }
                : { textAlign: 'center', padding: 20, fontSize: 24 }
            }
          >
            {!site.cornerLogo && 'Your Logo'}
          </div>
          <div style={{ flexGrow: 1 }} />
          <div
            id="menu-button"
            className="menu-icon"
            style={{ padding: 22, cursor: 'pointer' }}
          >
            <MenuIcon
              className="show-if-menu-closed"
              style={{ width: 36, height: 36, color: '#888' }}
            />
            <CloseIcon
              className="show-if-menu-open"
              style={{ width: 36, height: 36, color: '#888' }}
            />
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: 82,
            right: 0,
            backgroundColor: '#fff',
            boxShadow: '0px 1px 8px rgba(0,0,0,0.4)'
          }}
          className="show-if-menu-open"
        >
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
      </div>
    )}
  </RouteContext.Consumer>
)
