npm run build
heroku container:push web -a payment-playtec-v4
heroku container:release web -a payment-playtec-v4
