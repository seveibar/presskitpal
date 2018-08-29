// @flow

import * as React from 'react'

const Button = ({ url, title, description }) => (
  <a
    href={url}
    style={{
      textDecoration: 'none',
      color: 'inherit'
    }}
  >
    <div
      className="admin-button"
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        border: '1px solid #ddd',
        width: 200,
        height: 150,
        borderRadius: 4,
        cursor: 'pointer',
        margin: 8
      }}
    >
      <div style={{ padding: 10, fontSize: 18, backgroundColor: '#eee' }}>
        {title}
      </div>
      <div style={{ padding: 10, color: '#888' }}>{description}</div>
    </div>
  </a>
)

const Section = ({ title, description, children }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      marginTop: 30,
      border: '1px solid #ccc'
    }}
  >
    <div
      style={{
        backgroundColor: '#eee',
        width: 400,
        paddingBottom: 20,
        borderRight: '1px solid #ccc'
      }}
    >
      <div
        style={{
          padding: 20,
          fontWeight: 'bold',
          fontSize: 24
        }}
      >
        {title}
      </div>
      <div style={{ padding: 20, width: 360 }}>{description}</div>
    </div>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        padding: 30
      }}
    >
      {children}
    </div>
  </div>
)

const pages = `
essentials;intro; Introduction; Name of your company and text on your press kit home page.
essentials;contact; Contact; Contact information for press outlets to get in touch.
essentials;address; Address; Location of your company.
essentials;links; Links; Your twitter, blog, LinkedIn, etc.
content;articles; Articles; Blog posts or stories about your business.
content;testimonials; Testimonials; Things your customers are saying about you.
content;press-releases; Press Releases; Add a link to a press release.
content;team; Team; Everyone involved in your company.
content;images; Images; Images of your product or pictures of your office and team.
content;videos; Videos; Videos of your products or promotional content.
content;logos; Logos; The logo of your product or company.
content;downloads; Downloads; Anything else reporters should be able to download e.g. pdf documents.
settings;account;Account;Change account details, add other administrators.
settings;billing;Billing;Update billing information or subscription.
settings;domain;Domain;Add a custom domain.
settings;style;Style;Edit the colors and style of your press kit.
settings;import-export;Import & Export;Backup or restore your press kit.
`
  .split('\n')
  .map(a => a.split(';').map(b => b.trim()))
  .map(([section, url, title, description]) => ({
    section,
    url,
    title,
    description
  }))

export default () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: 10 }}>
    <div
      style={{
        flexShrink: 1,
        maxWidth: 1400,
        width: '100%',
        display: 'flex',
        flexGrow: 1,
        flexShrink: 1,
        flexDirection: 'column'
      }}
    >
      <Section
        title="Essentials"
        description="Information that should be in every press kit: Your address, important links, introduction to your company, and contact information."
      >
        {pages
          .filter(a => a.section === 'essentials')
          .map(pg => (
            <Button
              url={`/admin/${pg.url}`}
              title={pg.title}
              description={pg.description}
            />
          ))}
      </Section>
      <Section title="Additional Pages" description="Additional information.">
        {pages
          .filter(a => a.section === 'content')
          .map(pg => (
            <Button
              url={`/admin/${pg.url}`}
              title={pg.title}
              description={pg.description}
            />
          ))}
      </Section>
      <Section
        title="Settings"
        description="Customize the appearance of your press kit or manage users."
      >
        {pages
          .filter(a => a.section === 'settings')
          .map(pg => (
            <Button
              url={`/admin/${pg.url}`}
              title={pg.title}
              description={pg.description}
            />
          ))}
      </Section>
    </div>
  </div>
)
