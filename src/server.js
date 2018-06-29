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
import request from 'request-promise'

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
      this.app.listen(3003, () => {
        console.log('HTTP API Started on 3003')
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
    // pull the root data from the db
    this.app.use(async (req, res, next) => {
      req.site = next()
    })
  }

  _configureRoutes = async () => {
    console.log('configuring routes...')
    for (const [route, componentFunc] of Object.entries(routeMap)) {
      console.log('configuring route: ', route)
      this.app.get(`/${route}`, async (req, res) => {
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
          site
        })

        if (isValidElement(renderedComponent)) {
          res.send(
            htmlTemplate({
              site,
              body: ReactDOM.renderToString(renderedComponent)
            })
          )
        } else {
          res.json(renderedComponent)
        }
      })
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
      res.send(
        htmlTemplate({
          body: ReactDOM.renderToString(
            await routeMap['/404']({
              req,
              res,
              db: this.db,
              pages: Object.keys(routeMap)
            })
          )
        })
      )
    })
  }
}

export default HTTPAPI
