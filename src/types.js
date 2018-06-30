// @flow

export type PageParameters = {
  route: string,
  db: any,
  site: SiteData
}

export type LinkType =
  | 'youtube'
  | 'linkedin'
  | 'blog'
  | 'medium'
  | 'twitter'
  | 'instagram'
  | 'facebook'
  | 'crunchbase'
  | 'angellist'
  | 'website'

export type SiteData = {
  name: string,
  cornerLogo: string,
  primaryColor: string,
  about: { text: string },
  contact: {
    text: string,
    personImage: string,
    personEmail: string,
    personPhone: string
  },
  address: {
    fullAddress: string,
    text: string
  },
  links: Array<{ type: LinkType, url: string }>,
  pressCoverage: {
    articles: Array<{
      datePublished: string,
      publicationImage: string,
      quotation: string
    }>
  },
  people: {
    team: Array<{ name: string, title: string, imageURL: string }>,
    text: string
  },
  images: Array<{ url: string, text: string }>,
  videos: Array<{ url: string }>,
  logos: Array<{ url: string, text: string }>
}
