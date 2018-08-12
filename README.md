# MarkHub

## Description

Online notebooks collection based on Markdown (and empowered by GitHub - BACKLOG).



 ## MVP

 - **Sign Up** - As a user I want to sign up on the webpage so I can have an account and access all Markhub funcionalities. 
 - **Login** - As a user I want to be able to log in on the webpage so I can get back to my account.
 - **Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account



 - **Landing page** - As a user I want to be able to access to a landing page so I can see what the app is about and login and signup.
 - **Homepage** - As a user I want to be able to see my Homepage with a resume of all my mdBooks and mdNotes.
 - **View Profile** - As a user I want to see my profile so that I can check/edit my info.
 - **View mdBooks** - As a user I want to see my mdBooks collection so I can work on them.
- **View help** - As a user I want to see a help page so I can look for any info in case I have doubts about how the web works.



 - **Create mdBooks**- As a user I want to be able to create mdBooks so I can add mdNotes on it. 
 - **Delete mdBooks**- As a user I want to be able to delete my mdBooks.
 - **Create mdNotes**- As a user I want to be able to create mdNotes in md. format so I can write anything I want on it. 
 - **Edit mdNotes**- As a user I want to be able to edit my mdNotes so I can add or delete things on them. 
 - **Delete mdNotes**- As a user I want to be able to delete my mdNotes.



 - **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so I know that is not my fault



## BACKLOGS:

List of other features outside of the MVP scope:



**GitHub**



## API ROUTES:

+ **POST - api/auth/signup** - Body: username, password 
+ **POST - api/auth/login** - Body: username, password
+ **POST api/auth/logout**

+ **GET api/auth/me** - Check session status



+ **GET api/mdBooks** -Get all books from user. (Id from session - Populate mdNotes id ) 
+ **POST api/mdBooks/new** - Body: title
+ **POST api/mdBooks/:id/edit** - POST: id, title
+ **POST api/mdBooks/:id/delete** - POST: id (delete all mdNotes too)



+ **POST api/mdBooks/:id/new** - POST: id, mdNote title, mdNote content

+ **POST api/mdNotes/:id/delete** - POST: id

+ **POST api/mdNotes/:id/edit** - POST: id, title, content

  

## MODELS

```
User
 - username: String
 - password: String
 - email: String
```

```
mdBook
 - title: string
 - mdNotes: Array [<ObjectID>]
```

```
mdNotes
- title: string
- content: string
```



## Links

### Trello

https://trello.com/b/qPwy4hYr/localbuddy

### Git

The url to your repository and to your deployed project

https://trello.com/b/FSBUOL9C/markhub

[Deploy Link](http://heroku.com)

### Slides.com

The url to your presentation slides

[Slides Link](http://slides.com)



