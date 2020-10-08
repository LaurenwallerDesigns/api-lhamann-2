import 'dotenv/config';

const config = {
    env: process.env.NODE_ENV,
    mongoUri: process.env.MONGODB_URI,
    serverPort: process.env.PORT,
    serverDb: process.env.SERVER_DB,
    JWTSecret: process.env.JWT_SECRET,
}

export default config;