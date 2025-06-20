# Expert Cloud - Task Manager assessment

Build a simple web application that allows users to manage a list of tasks. This application
should demonstrate basic CRUD (Create, Read, Update, Delete) operations.

 * api (backend) - build in Rails 7.2.2.1
 * site (frontend) - build in react.js
 * relational database (postgresql)

## Project dependencies

  - Rails 7.2.2.1
  - ruby 3.3.0
  - psql (PostgreSQL) 14.17 
  - npm version = 6.14.8
  - npm install bootstrap

## Authentication
  - Device gem

## Database configuration
  you can get and set the database configurations [`DATABASE_CONFIGURATON`](/api/config/database.yml)
  
## Employe credentials
  You can get the employees credentials from [`Seed.rb`](/api/db/seeds.rb) file.

## How to run application on Local environment

  * Rails application
    - cd api
    `bash` rails s

  * React application
    - cd site
    `bash` PORT=3001 npm start
