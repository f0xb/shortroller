
# Shortroller

A URL shortener that can redirect the users _randomly_ to funny links instead of the intended ones based on a given probability.

### Live Deployment: https://shortroller.herokuapp.com
---

### What does it do?
- Shortens links for users
- The shortened links can redirect who clicks it to either the true provided link by user __or__ a funny random link selected by the server
- Users can view their shortened links statistics (# of total clicks and trolls) using the shortened url link
- Users can decide the probability of trolling users when they click the shortened links
- The shortened URLs do detect if the URL requester is a Webmaster or a scraper (such as Facebook, Telegram, or WhatsApp) and provides the true URL's metadata so the links look authentic

### How does it do it?
- Users provide a link and a probability of trolling
- The server fetches the provided URL's __opengraph__ metadata/tags and saves them along with the URL
- The server responds with the shortened URL
- Users share with friends the shortened URL, they can be trolled based on the specified probability
- If the shortened link is shared on social media or inside a messaging app, the server will not redirect, it will detect that and respond with the true URL's opengraph metadata

### Technology
#### Backend
- NodeJS
- ExpressJS
- MongoDB
- express-validator
- nanoid
- open-graph-scraper

#### Frontend
- ReactJS
- Redux
- React Router
- Axios

### Todo List
- [ ] Guard backend API endpoints from spamming by rate-limiting requests based on IP

### Acknowledgement
This cool idea is a direct clone of the closed-source rroll.to. I attempted to recreate it only to practice web developement.
