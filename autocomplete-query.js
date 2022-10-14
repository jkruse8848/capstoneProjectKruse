const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
// connect to your Atlas cluster
dotenv.config();

const uri = process.env.MONGODB;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    // set namespace
    const database = client.db("test");
    const coll = database.collection("inmates");
    // define pipeline
    const agg = [
      { $search: { autocomplete: { query: "john", path: "fullname" } } },
      { $limit: 20 },
      { $project: { _id: 0, title: 1 } }
    ];
    // run pipeline
    const result = await coll.aggregate(agg);
    // print results
    await result.forEach(doc => console.log(doc));
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
