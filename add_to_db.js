const MongoClient = require("mongodb").MongoClient;
const all_album = require("./test.json");

const uri =
  "mongodb+srv://admin:admin@piggymongodb-hlnaa.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(uri, (err, client) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected");
  const collection = client.db("project0").collection("album_list");
  collection.insertMany(all_album);
});
