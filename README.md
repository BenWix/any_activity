AnyActivity is a minimalist web application that will gather the weather at the user's current location 
and display the weather condition, along with an appropriate activity suggestion. For example, if it is 
currently sunny and 90 degrees outside, anyActivity could suggest you go for a swim, or go sun bathing. 
AnyActivity is already seeded with several suggestions for different weather conditions, but more can 
be added by any user of the application. 

![Image of homescreen](https://imgur.com/c6kuHDd)

The weather data comes from the Open Weather Api and the activities submitted by users is stored on a 
rails back end. The front end is vanilla javascript. In order to use the application, after the repo is 
copied to a local device, a key for openweather must be attained. This can be found by creating an account 
at the following link

https://home.openweathermap.org/users/sign_in

Once a key is achieved, the user will need to create a .env file in the any_activity_backend directory. 
Then the following should be placed in the .env file.

OW_KEY = #{your_open_weather_key}

Once this is completed. While in the backend directory run bundle install, rails db:seed, and run any pending
migrations. With this completed, the rails server can be started on localhost:3000 and the application should 
work when you open the index.html file in the any_activity_front_end directory.

