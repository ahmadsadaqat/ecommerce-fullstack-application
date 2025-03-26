import { Router } from "express";
import { validateData } from "../../middleware/validationMiddleware";
import {
  createUserSchema,
  loginSchema,
  usersTable,
} from "../../db/usersSchema";
import bcrypt from "bcryptjs";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import Jwt from "jsonwebtoken";

const router = Router();

router.post("/login", validateData(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.cleanBody;
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      res.status(401).send("Authentication failed");
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).send("Authentication failed");
      return;
    }
    // create a jwt token and send it back to the user
    const token = Jwt.sign({ email: user.email, role: user.role }, "secret", {
      expiresIn: "1h",
    });

    // @ts-ignore
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.post("/register", validateData(createUserSchema), async (req, res) => {
  try {
    const data = req.cleanBody;
    data.password = await bcrypt.hash(data.password, 10);

    const [user] = await db
      .insert(usersTable)
      .values(data)
      .returning()
      .execute();

    // @ts-ignore
    delete user.password;

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

export default router;
