export const config = {
  secrets: {
    jwt: 'mysecretkey'
  },
  database:'payment-academy',
  dbUrl: process.env.MONGO_URL_ATLAS
}