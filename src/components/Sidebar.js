// @flow

import React from 'react'

export default ({ site }: any) => {
  const Button = ({ children, active }) => (
    <div
      className="sidebar-button"
      style={
        active ? { backgroundColor: site.primaryColor, color: '#fff' } : {}
      }
    >
      {children}
    </div>
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
      <Button active>About</Button>
      <Button>Contact</Button>
      <Button>Links</Button>
      <Button>Press Coverage</Button>
      <Button>People</Button>
      <Button>Images</Button>
      <Button>Videos</Button>
      <Button>Logos</Button>
      <Button>Testimonials</Button>
    </div>
  )
}
