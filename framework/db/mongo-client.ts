import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {}

let mongoClient
let mongoClientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV !== 'production') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalAny:any = global;

  if (!globalAny._mongoClientPromise) {
    mongoClient = new MongoClient(uri, options)
    globalAny._mongoClientPromise = mongoClient.connect()
  }
  mongoClientPromise = globalAny._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  mongoClient = new MongoClient(uri, options)
  mongoClientPromise = mongoClient.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default mongoClientPromise
