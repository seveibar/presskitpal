// @flow

import { hashPassword } from '../password'
import yaml from 'js-yaml'
import request from 'request-promise'

const rootData = yaml.safeLoad(`
name: Example Site
cornerLogo: logo01.jpg
about:
  text: |
    # You'll love this website, here's why
    This website is awesome!
contact:
  text: |
    For press inquiries, please contact:
  personImage: contact-image.jpg
  personName: Jane Doe
  personEmail: press@example.com
  personPhone: 123-456-7891
address:
  fullAddress: |
    2 Avenue De Lafayette
    Boston, MA, 02111
    United States
  text: |
    We're located in scenic Boston, boy do we love it.
links:
  - type: youtube
    url: https://youtube.com
  - type: linkedin
    url: https://linkedin.com
  - type: blog
    url: https://blog.com
  - type: medium
    url: https://medium.com
  - type: twitter
    url: https://twitter.com
  - type: instagram
    url: https://instagram.com
  - type: facebook
    url: https://facebook.com
  - type: crunchbase
    url: https://crunchbase.com
  - type: angellist
    url: https://angellist.com
  - type: website
    url: https://website.com
pressCoverage:
  articles:
    - datePublished: 05/30/2017
      publicationImage: publication1.jpg
      quotation: |
        An incredible new resource for doing this and that.
    - datePublished: 02/30/2016
      publicationImage: publication2.jpg
      quotation: |
        Truly breathtaking this, and wonderful that.
team:
  - name: John
    title: CEO
  - name: Joseph
    title: COO
  - name: Candice
    title: CTO
  - name: Zaran
    title: Senior Web Developer
  - name: Jessica
    title: Web Developer
images:
  - url: img01.jpg
    text: In the office with the team
  - url: img02.jpg
    text: Sales team presenting at a conference.
videos:
  - url: https://www.youtube.com/watch?v=yGWkUFH-T0M
logos:
  - url: logo01.jpg
    text: Our mascot!
  - url: logo02.jpg
    text: Another version of our logo!
`)

export default async db => {
  await db('admin_user').insert({
    admin_user_id: 'admin',
    password_hash: hashPassword('admin')
  })

  await db('info').insert({
    path: 'root',
    value: JSON.stringify(rootData)
  })

  await db.batchInsert(
    'image',
    await Promise.all(
      [
        'logo01.jpg',
        'logo02.jpg',
        'img01.jpg',
        'img02.jpg',
        'publication1.jpg',
        'publication2.jpg',
        'contact-image.jpg'
      ].map(async (path, i) => ({
        path,
        value: await request({
          url: `https://placem.at/things.jpg?w=400&h=300&random=${i}`,
          encoding: null
        }),
        extension: 'jpg'
      }))
    )
  )

  await console.log(
    '\n\nDATABASE SEEDED!\n\nYou can now log in with the following credentials:\nusername: admin\npassword: admin\n\n'
  )
}
