Welcome to Lean2

<img src="https://i.ibb.co/s525gB9/tent-fire-copy.png" alt="drawing" width="100"/>

App URL: https://agents-dev-team-project-3.github.io/lean2/

API URL: https://afternoon-springs-15413.herokuapp.com

Client Repo: https://github.com/Agents-Dev-Team-Project-3/lean2

Lean2 API

Unathenticated Routes:

|HTTP Method |URL Path|Result|Action |
| :---    |    ---:   |   ---: |   ---: |
| GET | /products | read all products | index |
| GET | /products/:id | read single product | show or retrieve |
|POST| /sign-up| create new user | create|
|POST| /sign-in| sign in existing user | sign in|

Authenticated Routes:

|HTTP Method |URL Path|Result|Action |
| :---    |    ---:   |   ---: |   ---: |
| GET | /orders | read all user's orders | index |
| GET | /orders/:id | read single user order | show or retrieve |
| POST | /orders/open | create a new order | create |
|PATCH| /orders/:id| update a user's order| update|
|DELETE| /sign-out| sign out user| sign out|

---

Lean 2 is an e-commerce site where you’ll find outdoor gear and clothing for every budget and skill level. This is camping, hiking, trail running, mountain biking, skiing, mountaineering, backpacking and more, all under one lean-to.
----
The site was created using React.js and Stripe.js as part of a team project for General Assembly's Software Engineering Intensive in August 2021 by the following team of software developers:

Andrew Kestler kestler.andrew@gmail.com

Jonathan Cole idc.saxjunky@gmail.com

Zachary Kogan zacharykogan@gmail.com

Pablo Maldonado-Hernandez pmhernandez2001@gmail.com


---

Technologies Used:


MongoDB

Mongoose

Express

JavaScript

---
ERD:

![ERD](https://i.ibb.co/10VmVnf/project-3-erd-copy.png)

This is V1.

Future version will include search by name functionality and many UI imporvements.
