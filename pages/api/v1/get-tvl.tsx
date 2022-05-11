import { portfoliosCollectionName } from "@framework/db/collection-names";
import mongoClientPromise from "@framework/db/mongo-client";
import reportApiError from "@framework/utils/report-api-error";

const handler = async (request, response) => {
  const mongoClient = await mongoClientPromise;

  response.setHeader(
    "Cache-Control",
    "max-age=0, s-maxage=60, stale-while-revalidate, public"
  );
  try {
    const databaseName = process.env.MONGODB_DATABASE_NAME;

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
            _id: "$networkName",
            tvl: { $sum: "$cached.value" },
          },
        },
      ]);

    const jsonResponse = {
      networks: [],
      tvl: 0,
    };

    while (await cursor.hasNext()) {
      const tvlResult = await cursor.next();
      jsonResponse["networks"].push({
        network: tvlResult["_id"],
        tvl: tvlResult["tvl"],
      });
    }

    jsonResponse["tvl"] = jsonResponse["networks"].reduce(function (acc, cur) {
      return acc + cur.tvl;
    }, 0);
    response.status(200);
    response.json(jsonResponse);
  } catch (e) {
    response.status(500).json(e);
    reportApiError(e);
  }
};

export default handler;
