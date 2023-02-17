# Device GPS Tracker Application

## Description

This application allows us to view Location history of devices at a glance, as well as in detailed view. It also supports user creation and logging mechanism.

## Tech Stack

This project uses 
- ReactJS for rendering frontend application.
- NodeJS for maintaining backend server.
- MySQL for storing relational database.

## Installation instructions

- Navigate to project directory and install JS dependencies for backend server by commands ```cd server;npm i``` (Assuming you are currently at project root directory.)
- Navigate to project directory and install JS dependencies for frontend application by commands ```cd client;npm i``` (Assuming you are currently at project root directory.)
- Navigate to file /server/database.js and fill the TODOs with appropriate user and password. (One possible enhancement would be reading these from environment config instead of code, but it's included in code in interest of time).
- Start a SQL session and execute SQL commands present in file /schema.sql to initialize database.

The one time setup for installation is complete. 

## Running app locally

Assuming Installation instructions have been followed, all that is left is to run the backend and frontend application using commands (in separate terminal sessions). ```cd server;npm start``` and ```cd client;npm start```
