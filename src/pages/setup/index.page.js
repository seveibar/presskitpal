// @flow

import * as React from 'react'
import { hashPassword } from '../../password'
import defaultSite from '../../default-site'

export default async ({ db, req }: any) => {
  const [{ 'count(*)': numberOfAdminUsers }] = await db('admin_user').count()
  if (parseInt(numberOfAdminUsers) > 0) {
    return (
      <div>
        This Press Kit is already set up! <a href="admin">Click here</a> to go
        to the admin panel.
      </div>
    )
  }

  let error
  if (req.body.username && req.body.password && req.body.passwordVerify) {
    // TODO prevent common passwords
    const { username, password, passwordVerify } = req.body
    if (password !== passwordVerify) error = 'Passwords do not match'
    else {
      try {
        await db('admin_user').insert({
          admin_user_id: username,
          password_hash: hashPassword(password)
        })
        await db('info').insert({
          path: 'root',
          value: JSON.stringify(defaultSite)
        })
        return (
          <div>
            Setup Complete! Now visit the <a href="admin">Admin Panel</a>.
          </div>
        )
      } catch (e) {
        console.log(e.stack)
        error = 'Error creating admin user'
      }
    }
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee'
      }}
    >
      <div
        style={{
          width: 300,
          padding: 10,
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: 4
        }}
      >
        <b>PressKitPal Setup</b>
        <br />
        {error && <div style={{ color: '#f00' }}>{error}</div>}
        <br />
        <form method="POST">
          <input type="text" name="username" placeholder="Admin Username" />
          <input type="password" name="password" placeholder="Password" />
          <input
            type="password"
            name="passwordVerify"
            placeholder="Verify Password"
          />
          <input type="submit" value="Complete Setup" />
        </form>
      </div>
    </div>
  )
}
