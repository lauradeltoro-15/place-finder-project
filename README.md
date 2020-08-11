# Fainder App

Fainder is a web application designed to connect people that has great ideas/events but has no place to hold it and company owners that wants to share establishments for those events.

## Features

With Fainder you have the following features: 

#### Without sign up
  - A chatbot assistent that helps you to find different pages and functionalities (when you are logged in, there are more chatbot functionalities)
  - An event explore page, with a powerfull search engine. You can look for your favourite events with the event name, when (different time periods), who (who created the event, how many participants have already join it...), where (geolocation so you can find events near you, establishment type, capacity...) and what it is about (theme).
  - See details of an event. If it has a establishment confirmed, you can see the location, as well as "how to get there" driving, walking or in public transport.
 
 If you are logged in, you will also have the following features: 
 
  #### As a user
  - Create, edit or delete your own events.
  - Join/leave events published in the platform.
  - Confirm establishment offers when you are the owner of the event (you are the only one that can see all the offers)
  - Edit your profile
  - Look at your personal calendar. Events are represented in different colours deppending on if they are confirmed or not. 
  - Adding new events directly in a day of the calendar.
  - See your calendar events details.
  - Aside your calendar, you will find a recommendations sections based on your interests.
  - See Live events (a section that is only open when the event is taking place). All the participants can post pictures in real time and add comments to the event.
  
  #### As a company
  - Create, edit or delete your own establishments.
  - Edit your profile.
  - Add or delete offers to the events you want. You can only post one offer per establishment.
  - See all your calendars (every establishment has its own calendar) with all the offers you have submitted.
  - Aside the calendar you will find a recommendations sections, based in your establishment type, so you can make offers to those events. 


## Technologies
- HTML5
- CSS3
- Javascript ES6
- React
- Node JS
- Express JS
- Mongoose
- Mongo DB

## Launch
 
 You can see the app in https://fainder.herokuapp.com/


## Endpoints table


Id // Method // Path                                            //  Description
----------------------------------------------------------------------------------------------------------
1    |   post  |  /signup                                     |        Register a new user
2       post    /login                                              Signin
3       post    /logout                                             Sign out
4       get     /loggedin                                           Check if an user is logged in                          
5       post    /api/files/upload                                   Upload pictures to cloudinary
6       delete  /api/local/delete/:localId/:id                      Delete a local of the DB
7       put     /api/local/edit/:localId/:id                        Edit local info
8       get     /api/local/details/:localId                         Get the details of a local
9       post    /api/local/add/:id                                  Create a new local
10      get     /api/local/:userId                                  Get the local of an user    
11      post    /api/offer/create/:id                               Create a new offer
12      get     /api/offer/getAllLocalOffers/:localId               Get all offers of a local
13      get     /api/offer//getAllEventsOffers/:eventId             Get all offers of an event
14      delete  /api/offer/delete/:offerId/:id                      Delete an offer
15      put     /api/offer/accept/:offerId/event/:eventId/:id       Accept an offer of an event
16      get     /api/user/event/:id/getUserRecommendations          Get recommendations of events for the 'person' user
17      get     /api/user/event/:localId/getLocalRecommendations    Get recommendations of events for the local
18      get     /api/user/event/join/:eventId/:id                   Allows an user to join an event
19      put     /api/user/event/leave/:eventId/:id                  Allows an user to leave an event
20      get     /api/user/event/getAllEvents                        Get all the events
21      get     /api/user/event/getAllFutureEvents                  Get all future events
22      get     /api/user/event/getOwner/:eventId                   Get the owner of an event
23      get     /api/user/event/:userId/owned                       Get events where user is owner
24      get     /api/user/event/:userId/all/future                  Get all future events of an user
25      put     /api/user/event/:userId/all                         Get all events of an user
26      get     /api/user/event/:userId/participant                 Get events where user is participant
27      post    /api/user/event/create/:id                          Create an event
28      delete  /api/user/event/delete/:eventId/:id                 Delete an event
29      get     /api/user/event/event/:userId                       Get one event
30      get     /api/user/event/event/name/:eventName               Get event by name
31      put     /api/user/event/event/:eventId/:id                  Update event
32      get     /api/user/event/live/comments/:eventId              Get event comments
33      post    /api/user/event/live/comments/:eventId/:id          Add a new comment
34      get     /api/user/event/live/pictures/:eventId              Get pictures of an event
35      put     /api/user/event/:eventId/offer/add/:offerId         Add offer to an event
36      get     /api/user/event/:userId                             Get all events of a person
37      put     /api/user/profile/edit/:id                          Edit profile
38      get     /api/user/profile/:id                               Get user details
