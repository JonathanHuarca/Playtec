npm run build
heroku container:push web -a courses-playtec-v4
heroku container:release web -a courses-playtec-v4