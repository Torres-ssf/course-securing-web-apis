import { verify } from "jsonwebtoken";

export const ensureAuthentication = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization || authorization.split(" ")[0] !== "Bearer") {
    return response.status(401).json({ message: "missing jwt token" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = verify(token, "COURSE NODE SECURITY API");

    request.userId = _id;

    return next();
  } catch (error) {
    return response.json({ message: "jwt token not valid" });
  }
};
