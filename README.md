# Full stack developer assignment

Example Application build with Laravel and React

# About the project

The backend of the project is based on laravel 10 and by default uses a mysql db
The front end is based on react
In the root direct there is a web-app directory which contains all files related to react while the rest of the files are laravel files
To connect the backend and the frontend a laravel restful api was developed.The api also serves as backend for the mobile app written in flutter.
The use of a restful api ensure that the data consumed by the react web app and flutter app is always in sync

# Potential developments for the project

Implementation of role based authentication to allow only admin users to login to the app such that they can on;y capture contributions
Defining values for period and type and implementing drop downs for the inputfields.

# Link To Flutter Repo

https://github.com/epten08/financial_contributions_mobile

## Demo

https://financials-task.netlify.app/login

## Installation

Make sure you have environment setup properly. You will need PHP8.2, composer and Node.js.

1. Download the project (or clone using GIT)
2. Copy `.env.example` into `.env` and configure database credentials
3. Navigate to the project's root directory using terminal
4. Run `composer install`
5. Set the encryption key by executing `php artisan key:generate --ansi`
6. Run migrations `php artisan migrate`
7. Start local server by executing `php artisan serve`
8. Open new terminal and navigate to the `web-app` folder
9. Adjust the `baseURL` parameter in `web-app/src/axios-client`
10. Run `npm install`
11. Run `npm run dev` to start vite server for React

# Screenshots
![Screenshot 2024-01-23 154629](https://github.com/epten08/financial_contributions/assets/29504158/e974e6cb-fac8-43b8-b8bc-be5ba3190ff5)


![Screenshot 2024-01-23 154651](https://github.com/epten08/financial_contributions/assets/29504158/1a0fd9cc-5746-43b2-a9e1-f7eea4bac51a)


![Screenshot 2024-01-23 154733](https://github.com/epten08/financial_contributions/assets/29504158/dbd1fa56-9f9b-45ee-8f98-3c26024fa97c)

