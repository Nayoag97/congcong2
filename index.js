var Crawler = require("crawler");
const MongoClient = require("mongodb").MongoClient;
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

var get_list_album = new Crawler({
  maxConnections: 10,
  callback: (error, res, done) => {
    if (error) {
      console.log(error);
    } else {
      var $ = res.$;

      $(".archive-box")
        .find("article")
        .each((index, element) => {
          const album = {
            name: $(element)
              .find("article > h2 > a")
              .contents()
              .first()
              .text(),
            link: $(element)
              .find("article > div > a")
              .attr("href"),
            img: $(element)
              .find("article > div > a > img")
              .attr("src")
          };
          console.log(album.name);
          add_to_db(album);
        });
    }
    done();
  }
});

for (let index = 0; index < 20; index++) {
  get_list_album.queue("https://mrcong.com/page/" + index.toString() + "/");
}
