import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (request, response) => {
  try {
    console.log("request.query.id " + parseInt(request.query.id));
    let result = await request.db
      .collection("blogpost")
      .findOne({ id: parseInt(request.query.id) });
    //console.log(JSON.stringify(result));
    response.ok;
    response.json(JSON.stringify(result));
  } catch (error) {
    console.log(error);
  }
});

export default handler;
