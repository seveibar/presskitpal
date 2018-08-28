// @flow

export default async ({ req, db }) => {
  if (req.body.field_upload) {
    const site = JSON.parse(
      (await db('info')
        .select('value')
        .where({ path: 'root' })
        .first()).value
    )
    return site
  }
}
