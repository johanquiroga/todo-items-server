module.exports = {
  mongoUrl: process.env.MONGO_URL,
  whitelist: process.env.WHITELIST,
  secretKey: process.env.JWT_SECRET_KEY,
  clientUrl: process.env.CLIENT_URL,
};
