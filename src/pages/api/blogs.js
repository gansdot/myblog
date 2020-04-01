import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { ObjectID } from "mongodb";
//import fetch from "isomorphic-unfetch";
import fs from "fs";
//import uuid from "react-uuid";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (request, response) => {
  let result = {};
  try {
    // load all images at once before we render
    // const imageFiles = await request.db
    //   .collection("fs.files")
    //   .find()
    //   .sort({ uploadDate: -1 })
    //   .limit(5)
    //   .toArray();
    // console.log(imageFiles);

    // imageFiles.map(file => {
    //   request.bucket
    //     .openDownloadStreamByName(file.filename)
    //     .pipe(fs.createWriteStream("./static/" + file.filename))
    //     .on("error", function(error) {
    //       console.log("error");
    //       response.status(500).end();
    //       next(response);
    //     })
    //     .on("end", function() {
    //       console.log("done!");
    //     });
    // });

    result = await request.db
      .collection("blogpost")
      .find()
      .sort({ postedOn: -1 })
      .limit(5)
      .toArray();

    //extract image file
    result.map(data => {
      if (data.isBinary === "no") {
        request.bucket
          .openDownloadStreamByName(data.blogImage)
          .pipe(fs.createWriteStream("./public/" + data.blogImage))
          .on("error", function(error) {
            console.log("error");
            response.status(500).end();
          })
          .on("end", function() {
            console.log("done!");
            //response.send("time.jpg");
            //response.end();
            //next(response);
          });
      }
    });
  } catch (error) {
    console.log(error);
  }
  response.status(200);
  response.json(JSON.stringify(result));
});

handler.post(async (request, response) => {
  try {
    let doc = JSON.parse(request.body);
    console.log("this is document data :: " + doc);
    let file = doc.blogImage;
    let image = doc.image;
    console.log(" file " + file);
    // get the latest blog sequence number i.e id
    let totalCount = await request.db
      .collection("blogpost")
      .find()
      .count();
    let blogsequence = totalCount + 1;
    console.log("Blog Sequence Id    => " + blogsequence);
    //const encyfilename = blogsequence + "_" + filename;
    //save the blog data
    doc.postedOn = new Date();
    doc.id = blogsequence;
    //doc.blogImage = encyfilename;
    console.log("Posted on date      => " + doc.postedOn);
    //console.log("Logical Filename    => " + encyfilename);
    let result = request.db
      .collection("blogpost")
      .updateOne(
        { id: blogsequence, blogImage: "cow.jpg" },
        { $set: doc },
        { upsert: true }
      );
  } catch (error) {
    console.log(error);
    response.statusCode = 404;
    response.json({ message: "invalid file input" });
    response.end("NotOk");
  }
});

export default handler;
