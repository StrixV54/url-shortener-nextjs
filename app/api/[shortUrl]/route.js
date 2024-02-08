import connectDB from "@/mongodb/connect";
import ShortURL from "@/mongodb/urlSchema";
import { redirect } from "next/navigation";

export async function GET(request, { params: { shortUrl } }) {
  let url;

  try {
    await connectDB();
    url = await ShortURL.findOne({ short: shortUrl });
    if (url) {
      await ShortURL.updateOne(
        {
          short: shortUrl,
        },
        { $inc: { clicks: 1 } }
      );
    } else
      return new Response(`Url Not Found`, {
        status: 404,
      });
  } catch (error) {
    return new Response(`Something went wrong : ${error?.message}`, {
      status: 500,
    });
  } finally {
    if (url) redirect(url.full);
  }
}
