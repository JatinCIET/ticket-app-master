import User from "../../(models)/User";
import { connectDb } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, companyName } = await req.json();


    if (!name || !email || !password || !companyName) {
      return NextResponse.json({ message: "All fields are necessary" }, { status: 400 });
    }

    const hashedpassword = await Bcrypt.hash(password, 10);
    await connectDb();
    await User.create({ name, email, companyName, password: hashedpassword });

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 501 });
  }
}
