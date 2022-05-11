import { MongoClient } from 'mongodb'

const env = process.env.ENV
const options = {}

let mongoUri;
let databaseName;

if (env == 'prod') {
  mongoUri = process.env.MONGODB_URI_REMOTE
  databaseName = 'defibasket-prod'
} else if (env == 'dev') {
  mongoUri = process.env.MONGODB_URI_REMOTE
  databaseName = 'defibasket-dev'
} else {
  mongoUri = process.env.MONGODB_URI_LOCAL
  databaseName = 'defibasket-local'
}

let mongoClient
let mongoClientPromise


if (process.env.ENV !== 'prod') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalAny:any = global;

  if (!globalAny._mongoClientPromise) {
    mongoClient = new MongoClient(mongoUri, options)
    globalAny._mongoClientPromise = mongoClient.connect()
  }
  mongoClientPromise = globalAny._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  mongoClient = new MongoClient(mongoUri, options)
  mongoClientPromise = mongoClient.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export { mongoClientPromise, databaseName }
