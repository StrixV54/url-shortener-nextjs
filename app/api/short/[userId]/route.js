import connectDB from "@/mongodb/connect";
import ShortURL from "@/mongodb/urlSchema";

export async function GET(request, { params: { userId } }) {
  try {
    await connectDB();
    const shortUrls = await ShortURL.find({ userId });
    return Response.json({
      message: "Fetched Successfully",
      list: shortUrls,
    });
  } catch (error) {
    return new Response(`Something went wrong : ${error?.message}`, {
      status: 500,
    });
  }
}
