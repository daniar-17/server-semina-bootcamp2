const UserRefreshToken = require("../../api/v1/userRefreshToken/model");
const {
  isTokenValidRefreshToken,
  createJWT,
  createTokenUser,
  createRefreshJWT,
} = require("../../utils");
const Users = require("../../api/v1/users/model");
const { NotFoundError, BadRequestError } = require("../../errors");
const BadRequest = require("../../errors/bad-request");

const createUserRefreshToken = async (payload) => {
  const result = await UserRefreshToken.create(payload);

  return result;
};

const getUserRefreshToken = async (req) => {
  const { refreshToken, email } = req.params;
  const result = await UserRefreshToken.findOne({
    refreshToken,
  });

  if (!result) throw new NotFoundError(`refreshToken tidak valid `);

  const payload = isTokenValidRefreshToken({ token: result.refreshToken });

  if (email !== payload.email) {
    throw new BadRequestError("Email tidak valid");
  }

  const userCheck = await Users.findOne({ email: payload.email });

  const token = createJWT({ payload: createTokenUser(userCheck) });

  // const newRefreshToken = createRefreshJWT({
  //   payload: createTokenUser(result),
  // });
  // await createUserRefreshToken({
  //   refreshToken,
  //   user: result._id,
  // });

  // return { token, refreshToken: newRefreshToken };

  return token;
};

module.exports = {
  createUserRefreshToken,
  getUserRefreshToken,
};
