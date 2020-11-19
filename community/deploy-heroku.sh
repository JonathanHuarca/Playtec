npm run build
heroku container:push worker -a community-playtec-v4
heroku container:release worker -a community-playtec-v4
