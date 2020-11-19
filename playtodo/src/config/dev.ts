export const config = {
  secrets: {
    jwt: 'mysecretkey'
  },
  database:'api-starter',
  dbUrl: () => process.env.MONGO_URI_DEV
}