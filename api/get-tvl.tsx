import { portfoliosCollectionName } from "@framework/db/collection-names";
import { mongoClientPromise, databaseName } from "@framework/db/mongo-client";
import reportApiError from "@framework/utils/report-api-error";

const handler = async (request, response) => {
  const mongoClient = await mongoClientPromise;

  response.setHeader(
    "Cache-Control",
    "max-age=0, s-maxage=60, stale-while-revalidate, public"
  );
  try {
    // TODO: use getPortfolios instead
    const cursor = await mongoClient
      .db(databaseName)
      .collection(await portfoliosCollectionName())
      .aggregate([
        {
          $match: {},
        },
        {
          $group: {
            _id: null,
            tvl: { $sum: "$cached.value" },
          },
        },
      ]);

    if (await cursor.hasNext()) {
      const tvlResult = await cursor.next();
      response.status(200);
      response.json({"tvl":tvlResult.tvl});
    }
  } catch (e) {
    response.status(500).json(e);
    reportApiError(e);
  }
};

export default handler;
