import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "SALES" | "WAREHOUSE" | "ACCOUNTS";
}) {
  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Hash password
console.log("Incoming password:", data.password);

const hashedPassword = await bcrypt.hash(data.password, 10);

console.log("Hashed password:", hashedPassword);
console.log("Hash length:", hashedPassword.length);

const user = await prisma.user.create({
  data: {
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: data.role,
  },
});

  return user;
}
export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  console.log("User:", user);
  console.log("Entered Password:", password);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  console.log("Stored Password:", user.password);

  const passwordMatch = await bcrypt.compare(password, user.password);

  console.log("Password Match:", passwordMatch);

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}