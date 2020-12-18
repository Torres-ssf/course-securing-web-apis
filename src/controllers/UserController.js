import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { User } from "../models/userModel";

export class UserController {
  async create(request, response) {
    const { username, email, password } = request.body;

    const hashPassword = await hash(password, 10);

    const newUser = new User({
      username,
      email,
      hashPassword,
    });

    try {
      await newUser.save();

      delete newUser.hashPassword;

      return response.json(newUser);
    } catch (error) {
      return response.status(400).send({
        message: error,
      });
    }
  }

  async login(request, response) {
    const { email, password } = request.body;

    const userExists = await User.findOne({ email });

    if (!userExists) {
      return response
        .status(401)
        .send({ message: "wrong email/password combination" });
    }

    const passwordMatch = await userExists.comparePassword(
      password,
      userExists.hashPassword
    );

    if (!passwordMatch) {
      return response
        .status(401)
        .send({ message: "wrong email/password combination" });
    }

    const token = sign(
      {
        email: userExists.email,
        username: userExists.username,
        _id: userExists.id,
      },
      "COURSE NODE SECURITY API"
    );

    return response.json({ token });
  }
}
