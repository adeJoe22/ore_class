import "dotenv/config";

const envVariable = {
  port: process.env.PORT,
  env: process.env.NODE_ENV!,
  mongo: {
    local: process.env.MONGO_LOCAL!,
    cloud: process.env.MONGO_CLOUD!,
  },
  jwt: {
    user: {
      secret: process.env.USER_JWT_SECRET!,
      accessExpiration: process.env.ACCESS_TOKEN_EXPIRATION!,
      refreshExpiration: process.env.REFRESH_TOKEN_EXPIRATION!,
    },
  },
  mailer: {
    user: process.env.NODEMAILER_USER!,
    pass: process.env.NODEMAILER_PASS!,
  },
  url: {
    local: process.env.LOCAL_APP_URL!,
    deployed: process.env.DEPLOYED_APP_URL!,
  },
  google: {
    client_id: process.env.PASSPORT_GOOGLE_CLIENT_ID!,
    client_secret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET!,
    session_key: process.env.SESSION_KEY!,
  },

  cloudinary: {
    name: process.env.CLOUDINARY_NAME!,
    key: process.env.CLOUDINARY_API_KEY!,
    secret: process.env.CLOUDINARY_API_SECRET!,
  },
  google_mail: {
    client_id: process.env.GOOGLE_MAIL_CLIENT_ID!,
    client_secret: process.env.GOOGLE_MAIL_CLIENT_SECRET!,
    refreshtoken: process.env.GOOGLE_MAIL_REFRESHTOKEN!,
    redirect: process.env.GOOGLE_MAIL_REDIRECT!,
    password: process.env.GMAIL_APP_PASSWORD!,
  },
  paystack: {
    secret_key: process.env.PAYSTACK_SECRET_KEY!,
    public_key: process.env.PAYSTACK_PUBLIC_KEY!,
    cb_url_local: process.env.PAYMENT_CB_URL_LOCAL!,
    cb_url_deployed: process.env.PAYMENT_CB_URL_DEPLOYED!,
  },
  redis: {
    url: process.env.REDIS_URL, // Upstash Redis URL
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
      ? Number.parseInt(process.env.REDIS_PORT)
      : 6379,
    password: process.env.REDIS_PASSWORD,
  },
};

export default envVariable;
