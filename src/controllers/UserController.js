import { hash } from "bcrypt";
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
}
