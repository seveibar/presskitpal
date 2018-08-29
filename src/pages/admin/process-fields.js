// @flow
import set from 'lodash/set'
import get from 'lodash/get'

export default async ({ req, db }) => {
  if (req.body.field_upload) {
    const fieldKeys = Object.keys(req.body)
      .filter(a => !a.endsWith('_type'))
      .filter(a => !a.endsWith('_action'))
      .filter(a => a !== 'field_upload')
      .filter(a => a !== 'add_new')

    const actions = Object.keys(req.body)
      .filter(a => a.endsWith('_action'))
      .map(a => ({ key: a.replace(/_action$/, ''), action: req.body[a] }))

    if (req.body['add_new'])
      actions.push({ key: req.body['add_new'], action: 'addnew' })

    const fileKeys = Object.keys(req.files || {})

    let site = JSON.parse(
      (await db('info')
        .select('value')
        .where({ path: 'root' })
        .first()).value
    )

    for (const fieldKey of fieldKeys) {
      site = set(site, fieldKey, req.body[fieldKey])
    }
    for (const fileKey of fileKeys) {
      const file = req.files[fileKey]
      const ext = file.name.split('.').slice(-1)[0]
      const imageName = file.md5 + '.' + ext
      await db('image').insert({
        path: file.md5 + '.' + ext,
        value: file.data,
        mimetype: file.mimetype
      })
      site = set(site, fileKey, `/images/${imageName}`)
    }

    for (const { key, action } of actions) {
      if (key.match(/\[[0-9]+\]/)) {
        const arrayId = key.replace(/\[.*\]/g, '')
        const index = parseInt(key.match(/\[([0-9]+)\]/)[1])
        if (action === 'moveup') {
          const [ak, bk] = [`${arrayId}[${index}]`, `${arrayId}[${index - 1}]`]
          const [a, b] = [get(site, ak), get(site, bk)]
          site = set(set(site, ak, b), bk, a)
        } else if (action === 'movedown') {
          const [ak, bk] = [`${arrayId}[${index}]`, `${arrayId}[${index + 1}]`]
          const [a, b] = [get(site, ak), get(site, bk)]
          site = set(set(site, ak, b), bk, a)
        } else if (action === 'delete') {
          site = set(
            site,
            arrayId,
            get(site, arrayId).filter((a, i) => i !== index)
          )
        }
      } else {
        if (action === 'new') {
          site = set(site, key, get(site, key).concat({}))
        }
      }
    }

    await db('info')
      .update({ value: JSON.stringify(site) })
      .where({ path: 'root' })
    return site
  }
}
