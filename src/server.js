// @flow

import express from 'express'
import fileUpload from 'express-fileupload'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import path from 'path'
import ReactDOM from 'react-dom/server'
import htmlTemplate from './html-template'
import { isValidElement } from 'react'
import knex from 'knex'
import seed from './seed/index'
import fs from 'fs'
import tmp from 'tmp-promise'
import { verifyPassword } from './password'
import basicAuth from 'express-basic-auth'
import css from './index.css'

const importAll = r =>
  r.keys().reduce((acc, k) => {
    const routeName = k
      .replace(/^\./, '')
      .replace('/index.page.js', '/')
      .replace('.page.js', '')
    acc[routeName] = r(k).default
    return acc
  }, {})
const routeMap = importAll(require.context('./pages', true, /\.page\.js$/))

class HTTPAPI {
  db: any
  app: any
  authRouter: any

  init = async () => {
    console.log('initing http api...')

    let dbPath = path.join(process.env.DATA_PATH || '.', 'site.sqlite')
    if (process.env.SEED_DB) {
      dbPath = (await tmp.file()).path
    }

    console.log('using database at path: ', dbPath)

    this.db = knex({
      client: 'sqlite3',
      connection: {
        filename: dbPath
      }
    })

    try {
      await this.db.schema.createTable('info', table => {
        table.string('path').primary()
        table.string('value')
      })
      await this.db.schema.createTable('image', table => {
        table.string('path').primary()
        table.blob('value')
        table.string('extension')
      })
      await this.db.schema.createTable('admin_user', table => {
        table.string('admin_user_id').primary()
        table.string('password_hash')
      })
      if (process.env.SEED_DB === 'yes' || process.env.SEED_DB === 'true') {
        await seed(this.db)
      }
    } catch (e) {
      if (
        e.toString().includes('Error: create table') &&
        e.toString().includes('already exists')
      ) {
        // Table already exists, no big deal
      } else {
        throw e
      }
    }

    this.app = express()
    this._configureMiddleware()
    await this._configureRoutes()
    await new Promise(resolve => {
      this.app.listen(3000, () => {
        console.log('HTTP API Started on 3000')
        resolve()
      })
    })
  }

  _configureMiddleware = () => {
    this.app.use(fileUpload())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json({ limit: '90mb' }))
    this.app.use(cookieParser())
    this.app.use(morgan('tiny'))

    const router = new express.Router()
    router.use(
      basicAuth({
        challenge: true,
        authorizeAsync: true,
        authorizer: async (admin_user_id, password, cb) => {
          const user = await this.db('admin_user')
            .where({ admin_user_id })
            .first()
          if (!user) return cb(null, false)
          if (await verifyPassword(user.password_hash, password)) {
            cb(null, true)
          } else {
            cb(null, false)
          }
        }
      })
    )
    this.app.use('/admin', router)
    this.authRouter = router
  }

  _configureRoutes = async () => {
    console.log('configuring routes...')
    for (let [route, componentFunc] of Object.entries(routeMap)) {
      console.log('configuring:', route)
      let router = this.app
      if (route.startsWith('/admin')) {
        router = this.authRouter
        route = route.replace(/^\/admin\//, '')
      }
      const routeHandler = async (req, res) => {
        const site = JSON.parse(
          (await this.db('info')
            .select('value')
            .where({ path: 'root' })
            .first()).value
        )
        const renderedComponent = await componentFunc({
          req,
          res,
          db: this.db,
          site,
          route
        })

        if (isValidElement(renderedComponent)) {
          res.send(
            htmlTemplate({
              site,
              css,
              body: ReactDOM.renderToString(renderedComponent)
            })
          )
        } else {
          res.json(renderedComponent)
        }
      }
      router.get(`${route}`, routeHandler)
      router.post(`${route}`, routeHandler)
    }

    this.app.get('/images/:image', async (req, res) => {
      const imagePath = req.params.image
      const image = await this.db('image')
        .select(['value', 'extension'])
        .where({ path: imagePath })
        .first()
      if (!image) {
        res.status(404).send('image not found')
      } else {
        res.contentType(image.extension)
        res.end(image.value, 'binary')
      }
    })

    this.app.get('*', async (req, res) => {
      const site = JSON.parse(
        (await this.db('info')
          .select('value')
          .where({ path: 'root' })
          .first()).value
      )
      res.send(
        htmlTemplate({
          site,
          css,
          body: ReactDOM.renderToString(
            await routeMap['/404']({
              req,
              res,
              db: this.db,
              pages: Object.keys(routeMap).filter(k => !k.includes('admin'))
            })
          )
        })
      )
    })
  }
}

export default HTTPAPI
