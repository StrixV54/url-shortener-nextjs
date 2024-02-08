import connectDB from "@/mongodb/connect";
import UserModel from "@/mongodb/userSchema";

export async function POST(request) {
  try {
    await connectDB();
    const { name, email, password } = await request.json();

    let res = await UserModel.findOne({ email });

    if (res)
      return Response.json({
        message: "Data already existed",
      });

    // await bcrypt.hash(password, 12);
    res = new UserModel({ fullname: name, email, password });
    await res.save();
    return Response.json({
      message: "Successfully created the record.",
      name: res?.fullname,
      userId: res?._id,
    });
  } catch (error) {
    console.error(error);
    return new Response(`Something went wrong : ${error?.message}`, {
      status: 500,
    });
  }
}
