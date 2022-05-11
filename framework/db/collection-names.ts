import mongoClientPromise from "@framework/db/mongo-client";
const databaseName = process.env.MONGODB_DATABASE_NAME;

async function portfoliosCollectionName() {
  const mongoClient = await mongoClientPromise;
  const collections = await mongoClient
    .db(databaseName)
    .listCollections()
    .toArray();
  return collections.some((c) => c.name === "portfoliosStale")
    ? "portfoliosStale"
    : "portfolios";
}

async function transactionsCollectionName() {
  const mongoClient = await mongoClientPromise;
  const collections = await mongoClient
    .db(databaseName)
    .listCollections()
    .toArray();
  return collections.some((c) => c.name === "transactionsStale")
    ? "transactionsStale"
    : "transactions";
}

async function isUndergoingMaintenance() {
  const mongoClient = await mongoClientPromise;
  const collections = await mongoClient
    .db(databaseName)
    .listCollections()
    .toArray();
  return collections.some((c) => {
    return c.name === "transactionsStale" || c.name === "portfoliosStale";
  });
}
export {
  portfoliosCollectionName,
  transactionsCollectionName,
  isUndergoingMaintenance,
};
