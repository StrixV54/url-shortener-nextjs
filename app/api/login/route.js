import connectDB from "@/mongodb/connect";
import UserModel from "@/mongodb/userSchema";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    let res = await UserModel.findOne({ email });

    if (!res)
      return new Response(`Record couldn't be found, check body.`, {
        status: 400,
        statusText: "Record couldn't be found",
      });
    const isMatch = await bcrypt.compare(password, res?.password);
    if (isMatch)
      return Response.json({
        message: "Data found",
        user: { email: res?.email, name: res?.fullname, userId: res?._id },
      });
    return new Response(`Password didn't match.`, {
      status: 400,
      statusText: "Password didn't match.",
    });
  } catch (error) {
    console.error(error);
    return new Response(`Something went wrong : ${error?.message}`, {
      status: 500,
    });
  }
}
