var Crawler = require("crawler");
const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");

var list_album = [];

var get_album_list_image = new Crawler({
  maxConnections: 10,
  callback: (error, res, done) => {
    if (error) {
      console.log(error);
    } else {
      var $ = res.$;

      $("p")
        .find("img")
        .each((index, element) => {
          console.log($(element).attr("src"));
        });
    }
    done();
  }
});

var get_album_list_page = new Crawler({
  maxConnections: 10,
  callback: (error, res, done) => {
    if (error) {
      console.log(error);
    } else {
      var $ = res.$;

      $(".page-link")
        .find("a")
        .each((index, element) => {
          get_album_list_image.queue($(element).attr("href"));
        });
    }
    done();
  }
});

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
              .attr("src"),
            viewnum: $(element)
              .find(".post-views")
              .text(),
            category: $(element)
              .find(".post-cats > a")
              .text()
          };
          console.log(album);

          get_album_list_page.queue(album.link);
        });
    }
    done();
  }
});

get_list_album.queue("https://mrcong.com");

// for (let index = 0; index < 20; index++) {
//   get_list_album.queue("https://mrcong.com/page/" + index.toString() + "/");
// }
