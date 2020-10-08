# AnyActivity
AnyActivity is a minimalist single page web application that will gather and display the weather at the user's current location, along with an appropriate activity suggestion. For example, if it is currently sunny and 90 degrees outside, anyActivity could suggest you go for a swim, or go sun bathing. AnyActivity is already seeded with several suggestions for different weather conditions, but more can be added by any user of the application. 

![Image of homescreen](https://i.imgur.com/c6kuHDd.jpg)

The weather data comes from the Open Weather Api and the activities submitted by users is stored on a rails back end. The front end is vanilla javascript. 

## Using Any Activity
In order to use the application, first copy the repo is copied to a local device and a key for OpenWeather must be attained. This key can be found by creating an account at the following link

https://home.openweathermap.org/users/sign_in

Once a key is achieved, the user will need to create a .env file in the any_activity_backend directory. Then create a .env file and place it in the root directory, finally place the following line of code in the root directory.

OW_KEY = #{your_open_weather_key}

Once this is completed, while in the backend directory run bundle install, run any pending migrations by typing rails db:migrate, and finally seed the database by typing rails db:seed. With this completed, the rails server can be started on localhost:3000 and the application should work when you open the index.html file from the any_activity_front_end directory in your local browser.

