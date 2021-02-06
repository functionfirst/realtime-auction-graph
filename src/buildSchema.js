import fs from 'fs-extra'
import path from 'path'
import { graphql } from 'graphql'
import { introspectionQuery, printSchema } from 'graphql/utilities/index.js'
import { schema } from './schema/index.js'

const __dirname = path.resolve('./data')
// console.log(__dirname)

const schemas = {
  text: path.join(__dirname, 'schema.graphql.txt'),
  file: path.join(__dirname, 'schema.graphql'),
  json: path.join(__dirname, 'schema.graphql.json'),
}

async function buildSchema() {
  await fs.ensureFile(schemas.file)
  await fs.ensureFile(schemas.json)

  fs.writeFileSync(
    schemas.json,
    JSON.stringify(await graphql(schema, introspectionQuery), null, 2)
  )

  fs.writeFileSync(
    schemas.text,
    printSchema(schema)
  )
}

async function run() {
  await buildSchema()
  console.log('Schema build complete!')
}

run().catch((e) => {
  console.log(e)
  process.exit(0)
})
