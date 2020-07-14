class WeatherController < ApplicationController

    def show 
        render plain: "#{params[:lat]}, #{params[:long]}"
    end
end
