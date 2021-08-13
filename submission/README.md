# Kairos Planner & Journal

Developed by Derick Yearnsmith & Philippe Cantrel

## Deployment

[kairos.](https://www.kairos-journal.com/)

Server deployed using Heroku & Mongo Atlas

Client deloyed via Netlify

## Github

Server/Database:

https://github.com/philthehuman/kairos-backend

Client:

https://github.com/Yearnsmith/kairos-client

## Tech Stack

- Node.js
- React
- Express.js
- MongoDB

Testing done with JEST

## Libraries

Semantic UI

Moment.js

JSONWebToken

jwt-decode

Mongoose Autopopulate

Pluralize

BCrypt

React Calendar

## Project Management

[Trello](https://trello.com/b/eDaBxLkp/t3a2-final-assignment)

Preview Screenshots:

<img title="" src="file:///Users/phil/Documents/projects/submission/docs/Trello%20Screenshot.png" alt="Trello Screenshot.png" width="684">

![Trello Screenshot 2.png](/Users/phil/Documents/projects/submission/docs/Trello%20Screenshot%202.png)

## User Testing

User testing was conducted on four candidates remotely (on production site), and one on development site. Thier responses were recorded using a google form which can be found [here]([kairos user testing](https://docs.google.com/forms/d/e/1FAIpQLSfdz41ror3jnrLcCsk7N3SLMq1SvP-jGm_vHCdAIVBYGaIdug/viewform?usp=send_form)).

**<u>Summary</u>** - Most users didn't encounter bugs that prevented the app from operating. The most common feedback was in regards to post Life Goal creation. The general consensus was that it's confusing and feels like the Life Goals the users create at sign up don't get saved.

**<u>Bugs Reported</u>**

Users can create multiple Life Time goals in the same category.

Sometimes duplicate Life Time goals are created at sign up.

Events sometimes don't appear in calendar when created from goal screen

<u>User Experince Problems</u>

Users do not get a clear understanding of what the app is about and how to use it upon sign up.

Users need feedback to show that their Life Time goals have been created.

Users need to be guided through creating thier first term goal and event as it's not intuitive enough on first use

Loading icons need to be in place when requests are being made to the server and the client is waiting for data to display.

### User Feedback Response

In response to the user feedback receieved kairos will be updated to include the following:

- Change 'no goals placeholder' to include list of created Life Time Goals & an explaination of Term Goal creation.

- Loading states to be implemented when waiting on requests

- Home page that explains what kairos is and how to use it

- Bugfixes and coded tests for the reported bugs

### Full user testing data

![2021-08-13_21.16.13_docs.google.com_9d2c7f269be1.png](/Users/phil/Documents/projects/submission/docs/2021-08-13_21.16.13_docs.google.com_9d2c7f269be1.png)

# Part 1 Docs -

# Kairos - Goal Oriented Organiser

Developed by Derick Yearnsmith & Philippe Cantrel

#### Github Repo

Pending

#### Trello

https://trello.com/b/eDaBxLkp/t3a2-final-assignment

Invite Link

https://trello.com/invite/b/eDaBxLkp/79151b328baac0e50371799f0a37dab1/t3a2-final-assignment

## Purpose

Kairos is aimed at people who want to align their schedules with thier short and long term goals.

Having clearly defined goals is one of the most integral parts of long term acheivement and fulfilment. Kairos' main purpose is to allow users to set goals, fill their calendar with events that aid their accomplishment of those goals & then let them view, manage and track both their goals and events.

## Features

#### Create Goals

**Lifetime Goals**

When users first join they are prompted to create their 'lifetime goals'. These lifetime goals are broken down into the following categories.

- Career - Where do you want to get in the business world. If you could have any position in any industry, what would it be?
- Artistic - Goals relating to music, visual & performance arts, liturature etc. The lifetime artistic goal should be specific eg. "Perform a self-written song on piano to a live audience" or "Have a repertoire of 10 Jazz classic on bass" and not "learn the piano"
- Intellectual / Educational - What would you like to learn about or have knowledge on. This would cover skills such as woodworking, auto repair and programming but also covers intellectual pursuits like science, language learning and history.
- Physical - Goals related to sports and exercise that are unrelated to one's career. Examples include weight lifting goals, running a marathon or being able to perform certain skateboard tricks.
- Lifestyle - Goals that pertain to the way one lives their life. This would include things like marriage, home ownership, moving countries and travelling. It could also be related to more materialistic desires such as owning a specific type of car or having a house by the ocean. A goal like "Make time twice a week for the people I love (ie. friends and family)" could be included under this category.

Users will be instructed on how to create effective life goals with information backed by referenced science.

**Term Goals**

Users will be able to create  goals that relate to their four lifetime goals. Users will be prompted to create a term for these goals, however they will be prompted to create at least one 5yr, 1yr and weekly goal.

For example a user may create a 5yr goal of "Get promoted to Senior Developer role at my current work" and relate that to their Lifetime goal of "Become a Project Lead at a top software development company". A 1yr goal may be "Learn the swift programming language and create a functional iPhone app". A weekly goal may be "Read the first two chapters of 'Swift Programming for Beginners' and complete all associated exercises".

To make the user more likely to accomplish their goals, they will also include an explanation of why they want to achieve their goal. They will also have the option of including a reward for accomplishing the goal. For example a user could have the 6 month Goal of "Get a 6.0 GPA for Semester 2 at uni" with a reward of "Dinner at my favorite restaurant".

**Monetry Term Goals (Stretch Goal)**

Goals that invovle buying an item or saving up a set amount of money will work the same as habitual term goals but will include features to track how much has been saved.  The user will also optionally be able to enter how much their paycheques are and how often they receive them (weekly, fortnightly, monthly etc.) For example a user could have the goal of "Buy a new MacBook Pro". As this is a monetry goal they could set the price of the computer and then set the percentage of their paycheque that they want to put towards it. Kairos will then automatically update the amount saved for the MacBook every time the user marks that goal as complete on their payday.

#### Budget (Stretch Goal)

Extended budgeting features allows users to enter all of their income and expenses and when they are incurred. This enables users to see how much spare money they can put towards savings or desired purchases. It's also a great at a glance resource to see how much money the user is speding on different aspects of their life (ie. food, rent, transport, leisure etc.)

#### Calendar and Events

**Events**

Events are what enables the user to achieve their goals and gives them grounding in time and space (ie. has a set Day/Time and Location). Users will be able to create events by clicking the + (add event button) next to their desired related goal from the goals screen. In the montly calendar view, events can be created by selecting a free timeslot and in the weekly calendar view by clicking the + (add event button) next to their desired day. After pressing the add event button an overlay is shown which prompts the user to fill out the event details. Events have a title, description, related goal and a date and time. Optionally events can include a location, checklist and a related URL.

**Reccuring Events (Habits)**

Habits are events which the user wants to accomplish on a regular basis (daily, weekly, monthly). Habits will automatically create events for the user on each day they've nominated. For example, if a user wants to exercise daily, they can have an reccuring event named "Exercise for 30 minutes each morning", which can have a time of 6:30am and a duration of 30 minutes. Each day the user's calendar will now have an event of the same name at 6:30 - 7:00 am. For daily events the user can select days they don't want to have an event created (eg. every day except Sundays).

When viewing an event tapping/clicking on an event element (such as the title) will allow you to edit it.

**Calendar**

The calendar is where users can view all of their events. Kairos includes both a monthly  and weekly calendar view. 

On desktop the monthly view shows event titles at a glance, with full event info overlayed on click. On mobile users can select their preferred date and all corresponding events for that day are displayed below. Users can expand each event's information individually.

The weekly view on desktop displays all events for each day in a selected week. Users can scroll left and right to view earlier and later day of the same week or scroll up and down on an idividual day to see earlier or later events on that day. Users can expand and contract events for all days in the week or for each individual day. The mobile weekly view works the same, except only one day at a time is visible and users can select the day of the week thatr they want to view with a menu at the top of the page.

#### Profile & Goal Overview

In the profile tab, users can change their password and see the overall progress of their goals and habits displayed as progress bars.

#### Friends & Event Co-ordination (stretch goal)

Users can send friend requests by inputting their friend's email on the freinds page. The friend they add will be able to see their request on their friends page, along with the option to confirm or deny it. Once accepted, friends can add each other to events which will then be seen on both parties' calendars.

****

## Target Audience

- **Young-adult student** feels they have limited time, money, and energy to distribute between everything required of them both accademically and socially.
  
  Moreover, looking beyond schooling can be difficult with many uncertainties about career opportunities, starting a family (or not), and keeping a roof overhead — whether that means buying or renting.
  
  One certainty can be a set of goals to guide one through tertiary education, and out the other side. Savings goals, study goals, and life goals such as hobbies or health — the latter of which can imporove all others.
  
  The Tertiary student is already flooded with calendars, schedules, and online portals, so adding another service isn't desirable, unless it's a seamless process that can integrate with others for minimal effort.
  
  Time strapped, they prefer not to learn complex systems, and see events and tasks at a glance on their way to their next class, event, or hangout.

- **Mature-age student** has limited time and budget between work, study, and family. They require a highly organised schedule, but doing so also takes time away from tasks which seem more essential in the moment.
  
  There is an overlap here with both physical and mental health and fitness, where duties relating to work, study, and home often leave self-care to the side, as is one extra task and feels selfish to undertake when there are other seemingly more pressing needs to attend to.
  
  With self-care becoming less taboo, setting goals, and fitting them around daily life will be beneficial. As long as the planner is easy to integrate into a regular routine, and accessible from anywhere.
  
  The Mature Age Student is already flooded with calendars, schedules, and online portals, so adding another service isn't desirable, unless it's a seamless process that can integrate with others for minimal effort.
  
  Time strapped, they prefer not to learn complex systems, and see events and tasks at a glance on their way to their next class, event, or hangout.

- **Full-time worker** feels they have a limited scope of focus between work and social and/or family needs. Their day is a haze of meetings and checklists. If they work in an office, there is also at least an hour of travel included.
  
  The *full-time worker*, takes public transport to work, and spends this rough hour each way to catch up on: sleep, recreational reading, casual internet browsing, or job-related tasks — be it their current job, or a side-hustle.
  
  Learning technical systems is less of a priority than having software just work. Though some easy customisation can make it easier to fit in with their current setup. Being able to access the web app away from the desk is important, whether that be from the boardroom, business lunch, or from home.

- **Home maker** spends their time between looking after the house, and looking after family. They have a few children to care for, and devote a lot of time towards their youngest children during the day, and their school-aged children in the late afternoon and evening. Days when their young children are in pre-school, or other care, the *home maker* invests time into a side-hustle, or part-time work to bring in some extra money and support their working partner.
  
  While the home maker has flexibilty in their schedule (not having external meetings dictated to them), they spend a lot of time planning events, and scheduling activities for others.
  
  Planning everyone else's life often leave self-care to the side, as is one extra task and feels selfish to undertake when there are other seemingly more pressing needs to attend to.
  
  With self-care becoming less taboo, setting goals, and fitting them around daily life will be beneficial. As long as the planner is easy to integrate into existing routines, and is quick and intuitive to use and set up.

- **Empty nester** has more time than when they were raising a family, but now their time is split between aging parents and supporting newly adult children, along with their regular work and social calendar.
  
  Achieving te goals they never finished to while raising a family is higher on the priority list, such as paying off the mortgage, climbing the corporate ladder, saving for retirement, and a little bit of travel.
  
  Achieving new goals is also more acheivable: running a marathon, and luxuries like a boat, or buying a holiday home or investment property.

- **Tech-savvy retiree** likes to keep up with all things tech, and thrived in their information career. Now they have stopped working, they technically have a lot more spare time, but modern life has filled it with social events, looking after ageing parents, and being an attentive grandparent.
  
  They have ticked off a bunch of life goals, but had let some slip as a necessity circumstance, and focusing inward on the self once felt selfish or was pushed to the side while other seemingly more pressing needs were attended to.
  
  The retiree is now focused on achieving travel goals, and lifestyle goals of settling a little removed from the hustle and bustle of the city. They are also focused on adding some new goals, like getting fit and seriously attending to their hobby.
  
  Scheduling and planning is less focused on harmonsing work/life balance, than it is managing health-care, family responsibility, and social events.
  
  Though the *tech-savvy reitree* is able to use an iphone and navigate the internet, advanced uses of these technologies take longer to learn than their younger digital native counterparts. They are used to spread-sheets and desktop apps, so using a web-app is a little foreign. A known, intuitive interface is much more preferred than using an entirely new system.

- **New user** hasn't created an account yet, and stil learning what it is and how it works.

- **Product owner** is guiding the app to completion, and maintaining it once it has been finished.

## Tech Stack

**MERN Stack**

- React/Node.js - Front End
- Express - Back End API
- MongoDB - Database

## Dataflow Diagrams

#### New User Data Flow Diagram

![NewUserDFD.png](docs/DFD/NewUserDFD.png)

#### Existing User Data Flow Diagram

![ExistingUserDFD.png](docs/DFD/ExistingUserDFD.png)

#### Goals and Calendar Data Flow Diagram

![GoalsCalendarDFD.png](docs/DFD/GoalsCalendarDFD.png)

#### Friend System Data Flow Diagram

![FriendsDFD.png](docs/DFD/FriendsDFD.png)

## Application Architecture Diagram

![ArchitectureDiagram.png](docs/ArchitectureDiagram.png)

## User Stories

#### Home Page

As a *prospective user*, I want information on the app's features to be easily accessible from the homepage, so I can make an informed decision to sign up.

As a *home maker*, *busy worker* or *empty nester*, I want the apps features to be written in laymen's terms, so I can understand its intricacies without prior knowledge.

As a *mature age* or *adult student*, I want well layed out reasoning as to why I should use the app, so I know I'm choosing the best organiser for my needs.

#### Account Creation

As a *new user*, I want account creation to be quick and straightforward, so I can start using the app right away.

As a *tech-savvy retiree*, I want to enter as little of my personal information as needed to sign up, in order to save time and reduce the risk of my information being leaked or sold.

As a *new user*, I want to create an account, so I can start tracking goals!

As a *product owner*, I want my users to have unique usernames and emails, to make databases easier to manage.

As a *new user*, I want to be guided on how to best set up my life goals, so I can get the most out of the app.

As a *mature age* or *adult student* I want the information on goal setting to be correctly referenced, so I'm confident in its validity.

#### Login / Auth

As a *mature age* or *young adult student*, I want to log in to my account quickly and easily, to have more time and brain space to set goals.

As a *full time worked* or *young adult student* I want to use my email to login, so I don't have to memorise another arbitrary username.

As a *full-time worker*, I want to be automattically logged in every visit, so I can focus on planning my week.

As *anyone*, I want the sign in form to be as easily accessible as the sign up form from the home page, so I don't have to waste time navigating to a sign in page.

### Security

As a *tech-savvy retiree*, I want to change my password, if I suspect my account has been compromised

As a *young adult student,* I want my email address to be private, because I hate recieving spam

As a *tech-savvy retiree* or *home maker*, I want to reset my password, in case I forget it.

### Goal Setting

As a *home maker*, I want to quickly set a goal, because I'm often multi-tasking.

As a *full-time worker*, I want to see when I created a certain goal, so I have a complete record of my goals.

As *anyone*, I want to set an end date for my goal, because open-ended goals are almost impossible to achieve.

As a *mature-age student*, I want the end date for my goal to be set automatically, so I don't face decision paralysis.

As a *young adult student* or *mature age student*, I want to define my goal as short, medium, or long-term, to reduce the congnitive load of selecting specific dates.

As a *full-time worker* or *home maker*, I want to add a title for my goal, so I know what it is at a glance.

As *anyone*, I want to add a description of my goal, to remind me what my goal is, and why I'm trying to achieve the goal.

As a *full-time worker*, *mature-age student*, or *young-adult student*, I want to break my goal into actionable tasks, so I have practical steps I can plan.

As *anyone*, I want to set multiple goals, so I can work towards more than one goal at a time.

As an *empty nester*, I want to easily see all my goals in the one place view, so I don't forget about any.

As a *young-adult student* or *mature-age student*, I want to filter my goals by category and timeframe, to quickly find a goal.

As a *young-adult student*, *mature-age student*, or *full-time worker*, I want to sort my goals by name, age, timeframe, completion, or category to quickly find a goal.

As a *young-adult student*, I want to remove goals, to keep up my fluxuating life-circumstances.

As a *young-adult student*, I want to edit my goals, in case of typos or changing life circumstances.

As a *young-adult student*, *empty nester*, or *tech-savvy retiree*, I want some guidance in setting goals, because I don't have much experience in setting goals.

### Planning

As *anyone*, I want to create tasks related to goals so I can take

As a *mature-age student* or *home-maker*, I want to create events unrealted to goals, to integrate my many calendars into one.

As a *young-adult student* or *full-time worker*, I want to have a weekly overview of events/tasks, because I have a lot of events and appointments to keep track of.

As a *full-time worker* or *home maker*, *mature-age student*, or *young-adult student* I want to see today's schedule, so I'm not late to important appointments.

As a *mature-age student*, or *full-time worker*, I want to easily edit an event/task, because I don't have time to fuss around with complex menus.

As a *full-time worker* or *home maker*, I want to remove an event or task, in case of a cancellation.

As a *full-time worker* or *tech-savvy retiree*, I want to reschedule an event, in case of rescheduled meetings.

As a *young-adult student*, *mature-age student*, *full-time worker*, or *home maker*, I want to attach an open event or task to an existing goal, so I don't have to leave the calendar view.

As an *empty nester*, I want to create an event/task from a goal view, and have it automatically attach to that goal, so I can continue creating tasks for other goals afterwards.

## Wire Frames

### Landing Page

#### Phone / Mobile

![Landing Page - Small](docs/wireframes/landing-page/landing-page-sml.png)

#### Desktop

![Landing Page - Large](docs/wireframes/landing-page/landing-page-lrg.png)

### Sign Up

#### Phone / Mobile

![Sign Up - Small](docs/wireframes/sign-up/sign-up-sml.png)

#### Desktop

![Sign Up - Large](docs/wireframes/sign-up/sign-up-lrg.png)

### Vew Goals

##### Phone / Mobile

![View Goals - Small](docs/wireframes/view-goals/view-goals-sml.png)
![View Goals - Small](docs/wireframes/view-goals/view-goal-sml-single.png)

#### Tablet Portrait

#### ![View Goals - Medium - Portrait](docs/wireframes/view-goals/view-goals-med-p.png) Tablet Landscape

![View Goals - Medium - Landscape](docs/wireframes/view-goals/view-goals-med-l.png)

#### Desktop

![View Goals - Medium](docs/wireframes/view-goals/view-goals-lrg.png)

### New Goal

#### Phone / Mobile

![New Goal Small - A](docs/wireframes/new-goal/new-goal-sml-a.png)
![New Goal Small - B](docs/wireframes/new-goal/new-goal-sml-b.png)
![New Goal Small - C](docs/wireframes/new-goal/new-goal-sml-c.png)

#### Tablet Portrait

![New Goal Med - Portrait](docs/wireframes/new-goal/new-goal-med-p.png)

#### Desktop

![New Goal - Large](docs/wireframes/new-goal/new-goal-lrg.png)

### New Task

#### Phone / Mobile

![New Task - Small](docs/wireframes/new-task/new-task-sml.png)

#### Tablet Portrait

![New Task - Medium](docs/wireframes/new-task/new-task-med.png)

#### Desktop

![New Task - Large - A](docs/wireframes/new-task/new-task-lrg-a.png)
![New Task - Large - B](docs/wireframes/new-task/new-task-lrg-b.png)

### View Task

#### Phone / Mobile

![View Task - Small](docs/wireframes/view-task/view-task-sml.png)

#### Desktop

![View Task - Large](docs/wireframes/view-task/view-task-lrg.png)

### View Calendar

#### Phone / Mobile

![View Month - Small](docs/wireframes/view-calendar/view-month-sml.png)
![View Week - Small](docs/wireframes/view-calendar/view-week-sml.png)

#### Desktop

![View Month - Large](docs/wireframes/view-calendar/view-month-lrg.png)
![View Week - Large](docs/wireframes/view-calendar/view-week-lrg.png)

### New Event

#### Phone / Mobile

![New Event - Small](docs/wireframes/new-event/new-event-sml.png)

#### Desktop

![New Event - Large](docs/wireframes/new-event/new-event-lrg.png)

### View Profile

#### Phone / Mobile

![View Profile - Small](docs/wireframes/view-profile/view-profile-sml.png)

#### Desktop

![View Profile - Large](docs/wireframes/view-profile/view-profile-lrg.png)

## Trello Screenshots

**10/07/21**![T3A2 - Trello Screenshot 10-07-21](docs/Trello Screenshots/T3A2 - Trello Screenshot 10-07-21.png)

**14/07/21**

![Trello Screenshot 14-07-2021](docs/Trello Screenshots/Trello Screenshot 14-07-2021.png)

**23/07/21**

![Trello Screenshot 14-07-2021](docs/Trello Screenshots/T3A2 - Trello Screenshot 23-07-21.png)
