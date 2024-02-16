"use server";

import { isUrlValid } from "@/lib/utils";
import connectDB from "@/mongodb/connect";
import UserModel from "@/mongodb/userSchema";
import bcrypt from "bcrypt";
import UrlModel from "@/mongodb/urlSchema";
import ShortUniqueId from "short-unique-id";

export const registerFormSubmit = async (_prevState, formData) => {
  try {
    await connectDB();
    let email = formData.get("email");
    let password = formData.get("password");
    let name = formData.get("name");

    let res = await UserModel.findOne({ email });

    if (res) return { message: "Failed to create, already present." };

    const hashedPassword = await bcrypt.hash(password, 12);
    res = new UserModel({ fullname: name, email, password: hashedPassword });
    await res.save();

    return { message: "true", email, password };
  } catch (error) {
    return { message: "Something went wrong." };
  }
};

export const loginFormSubmit = async (_prevState, formData) => {
  try {
    await connectDB();
    let email = formData.get("email");
    let password = formData.get("password");

    let res = await UserModel.findOne({ email });
    if (!res) return { message: "Failed to find record, not registered." };

    const isMatch = await bcrypt.compare(password, res?.password);
    if (!isMatch) return { message: "Password didn't match." };

    return { message: "true", email, password };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong." };
  }
};

export const addRecordAction = async (_prevState, formData) => {
  let url = formData.get("link");
  let userId = formData.get("userId");

  if (!isUrlValid(url)) {
    return { message: "Invalid Url", error: true };
  }

  try {
    await connectDB();

    let res = await UrlModel.findOne({ full: url, userId });

    if (res) return { message: "Data already exists.", error: true };

    const generatedShortUrl = new ShortUniqueId({ length: 10 });
    const shortUrl = `${generatedShortUrl.rnd()}`;
    res = new UrlModel({ full: url, short: shortUrl, userId });
    await res.save();
    return { message: "Short URL Created Successfully" };
  } catch (err) {
    return { message: "Something went wrong", error: true };
  }
};

export const deleteDataAction = async (_prevState, { shortUrl, userId }) => {
  try {
    await connectDB();
    let url = await UrlModel.findOne({ short: shortUrl, userId });
    if (url) {
      await UrlModel.deleteOne({
        short: shortUrl,
        userId,
      });
      return { message: "Deleted Successfully" };
    }
    return { message: "Not Found", error: true };
  } catch (err) {
    return { message: "Something went wrong", error: true };
  }
};
