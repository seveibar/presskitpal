// @flow

const credential = require('credential')
const pw = credential()

export const hashPassword = (password: string) =>
  new Promise((resolve, reject) => {
    pw.hash(password, (err, hash) => {
      if (err) return reject(err)
      resolve(hash)
    })
  })

export const verifyPassword = (storedHash: string, password: string) =>
  new Promise((resolve, reject) => {
    pw.verify(storedHash, password, (err, isValid) => {
      if (err) return reject(err)
      resolve(isValid)
    })
  })
