import connectDB from "@/mongodb/connect";
import UrlModel from "@/mongodb/urlSchema";
import ShortUniqueId from "short-unique-id";

export async function POST(request) {
  try {
    await connectDB();
    const { originalUrl, userId } = await request.json();

    let res = await UrlModel.findOne({ full: originalUrl, userId });

    if (res)
      return Response.json({
        message: "Data already exists.",
      });

    const generatedShortUrl = new ShortUniqueId({ length: 10 });
    const shortUrl = `${generatedShortUrl.rnd()}`;
    res = new UrlModel({ full: originalUrl, short: shortUrl, userId });
    await res.save();

    return Response.json({
      message: "Successfully created the data.",
      shortUrl: res?.short,
    });
  } catch (error) {
    console.error(error);
    return new Response(`Something went wrong : ${error?.message}`, {
      status: 500,
    });
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const { shortUrl, userId } = await request.json();
    let url = await UrlModel.findOne({ short: shortUrl, userId });
    if (url) {
      const resultBack = await UrlModel.deleteOne({
        short: shortUrl,
        userId,
      });
      return Response.json({
        message: "Deleted Successfully",
        result: resultBack,
      });
    } else
      return new Response(`Url Not Found`, {
        status: 404,
      });
  } catch (error) {
    return new Response(`Something went wrong : ${error?.message}`, {
      status: 500,
    });
  }
}
