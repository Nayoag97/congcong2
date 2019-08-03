const uri =
  "mongodb+srv://admin:admin@piggymongodb-hlnaa.mongodb.net/test?retryWrites=true&w=majority";

const add_to_db = data => {
  MongoClient.connect(uri, (err, client) => {
    if (err) {
      console.log(err);
    }
    console.log("Connected");
    const collection = client.db("project0").collection("album");
    collection.insertOne(data);
  });
};
