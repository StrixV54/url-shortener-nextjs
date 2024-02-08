import connectDB from "@/mongodb/connect";
import UserModel from "@/mongodb/userSchema";

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    let res = await UserModel.findOne({ email, password });

    if (res)
      return Response.json({
        message: "Data found",
        user: { email: res?.email, name: res?.fullname, userId: res?._id },
      });
    else
      return Response.json({
        message: "Record does not exist",
      });
  } catch (error) {
    console.error(error);
    return new Response(`Something went wrong : ${error?.message}`, {
      status: 500,
    });
  }
}
