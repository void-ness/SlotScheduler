# Slot Scheduler Backend System
A system to schedule meetings with teachers. It provides users to login into the system, find and book slots as per their needs. On the other hand it provides an organiser, information about their scheduled slots.

## Overview
### Students
- Get - a list of available slots along with their details
- Book - an upcoming slot with your desired teacher

### Teacher
- Get - a list of all the slots your students have scheduled with you

### General
- Inbuilt authentication to prevent any unauthorized access to resources

## Tech Stack
1. **Node.js** - Runtime Environment for running javascript code outside browsers
2. **Express.js** - for creating the server and configuring various endpoints
3. **MongoDB** - to serve as the backend of the application
4. **mongoose** - to communicate with the backend

## Installation
1. Clone the repository 

2. Install the dependencies
    ```shell
    npm install
    ``` 
3. Add env variables <br />
In order to make sure that the jwt works fine, you need to create a secret key inside the `.env` file. An `example.env` file is present in the repository for your reference. 

4. Run the server
    ```shell
    npm run start
    ```
    The server will start running on your defined port number (default: 3000)

_(note: in order to run this project, you need to have a mongoDB service working on your system or be connected to any mongoDB atlas. You neeed to update the same in `index.js` file)_