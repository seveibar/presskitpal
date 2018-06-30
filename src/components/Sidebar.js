// @flow

import React from 'react'

export default ({ site, route }: any) => {
  const Button = ({ children, url: buttonURL }) => (
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
  )

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        minHeight: '100vh',
        borderRight: `2px solid ${site.primaryColor}`
      }}
    >
      {site.cornerLogo && (
        <div
          style={{
            width: 300,
            height: 200,
            backgroundImage: `url(${site.cornerLogo})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            marginBottom: 20
          }}
        />
      )}
      <Button url="/">About</Button>
      <Button url="/contact">Contact</Button>
      <Button url="/links">Links</Button>
      <Button url="/coverage">Press Coverage</Button>
      <Button url="/people">People</Button>
      <Button url="/images">Images</Button>
      <Button url="/videos">Videos</Button>
      <Button url="/logos">Logos</Button>
      <Button url="/testimonials">Testimonials</Button>
    </div>
  )
}
