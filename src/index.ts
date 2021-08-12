import dotenv from 'dotenv'
import express from 'express'

import { PORT } from './vars'

dotenv.config()
const app = express()

// define a route handler for the default home page
app.get(`/`, (_, res) => {
  res.send(`Hello worlds!`)
})

// start the Express server
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
