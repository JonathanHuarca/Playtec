npm run build
heroku container:push web -a auth-playtec-v2
heroku container:release web -a auth-playtec-v2
