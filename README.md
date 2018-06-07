![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)
# GA WDI Project Two - Bookclubr

This was the second project assignment during my time on General Assembly's Web Development Immersive Course (week 5-6). I built a community product around reading books (think of it as a virtual book club). The app allows users to:
* Create user profiles.
* Post their favourite books.
* Comment on and 'like' their favourite books.
* Follow other people in the community.

<p align="center"><img src="/images/bookclubr_demonstration_final.gif" width="700"></p>

##### [Visit the website](https://bookclubr.herokuapp.com/) to check it out (the app is not yet fully responsive. For best experience open on laptop).

## Brief
Design a full-stack Node app that must include:
* At least two models.
* At least one embedded or referenced schema.
* A persistent database (with all CRUD actions on records).
* User authentification (registration and session creation).
* RESTful routes.
* EJS for template creation.
* A CSS framework on the front-end.
* Deployed on Heroku.

## Build Process

### Inspiration
In order to gain inspiration for my web app I:
* Listed my areas of interest and brainstormed how to build useful apps.
* Listed communities I am part of and thought of what I could build to serve them.

<p align="center"><img src="./images/ideas.png" width="700"></p>

### Plan
From the experience of [my first project](https://github.com/stevanpopo/ga-wdi-project-one) I knew it was crucial to get to MVP as soon as possible. With that in mind, I:
* Created a list of all the features I wanted to create.
* Split the list by component parts of the app.
* Organized the list by which elements were crucial for MVP (phase one features) and which could be added in later (phase two features).
* Began to think about how to create those features, making notes of methods and data types that would be useful
* Tried to make sure each point on the plan was small enough that it could be solved indepedently (or googled easily).

<p align="center"><img src="/images/bookclubr_plan.png" width="700"></p>

### Build
The build phase involved simply getting in front of my computer and tackling each element of the plan one by one, with a focus on getting to MVP as quickly as possible. It felt very satisfying to tick these off and mark them as done (in green).

### MVP
A key milestone was to get to MVP. For me this meant:
1. Have a User model and controller that allowed for user registration and session creation.
2. A Book model and controller that allowed for book creation.
3. Commenting functionality on the books.

I managed to get to MVP by day 4. This meant I had a couple of extra days to work on CSS - making the site look a bit smarter as well as add some of the extra community features I desired (followers, likes, etc).

### Refactor
In my first project, I spent a big chunk of time refactoring the first version of my code. In this case I didn't, but some ways I would refactor in the future:
* I currently have the registrations controller handling other functions that relate to users in general. I'd move these to a separate users controller.

### Challenges
- **Populating Embedded Schema** - In order to create comments I have an embedded comment Schema on the Book model. Initially, I found it difficult to populate this schema and make the data available in the relevant views. I managed to solve this by installing the Bluebird plugin and using promises.
- **Silly Mistakes** - It wouldn't be learning to code without some silly mistakes. In this project, I had two particularly frustrating errors.
1. I was creating an if statement to check two object IDs, but didn't convert them to strings first, so they were not returning as equal.
2. In one function I had res and req the wrong way around as arguments, causing it to break. Didn't spot it for ages!
- **Time & Stress & Productivity Management** - Always a challenge, but gets better with each project. Here are the hours clocked in on Rescuetime.

<p align="center"><img src="./images/rescuetime.png" width="700"></p>

## Moving Forward / Future Features
Some features I could add moving forward:
* Clean up restrictions around user functionality when logged in vs when not logged in.
* Make more thorough errors messages and user feedback throughout the site.
* Allow users to search the site for books to see if it has already been posted.
* Allow liking/upvoting on specific comments.
* Allow sorting my comments.
* Create a user 'community score' that gives users points based on how they contribute with comments etc.

## Lessons Learned
* **Plan is just a plan.** My experience from two projects is to not get too attached to a plan. They always change (and generally extend).
* **Console.log everything when big fixing!!!** Can't stress this enough.

## Contact Me
Feel free to ask me questions about this project or anything else [on twitter](https://twitter.com/StevanPopo).

You can also find me on [LinkedIn](https://www.linkedin.com/in/stevanpopovic/) or over on [my personal site](http://www.stevanpopovic.com/).
