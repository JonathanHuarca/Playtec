export const config = {
  secrets: {
    jwt: 'learneverything'
  },
  database:'api-starter-test',
  dbUrl: () => process.env.MONGO_URI_TEST
}
