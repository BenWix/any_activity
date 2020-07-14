class WeatherController < ApplicationController

    def show 
        @key = ENV['OW_KEY']
        @lat = params[:lat].gsub('x','.')
        @long = params[:long].gsub('x','.')
        weather = get_weather
        render json: weather
    end

    private 

    def get_weather
        weather_url = "https://api.openweathermap.org/data/2.5/weather?lat=#{@lat}&lon=#{@long}&appid=#{@key}"
        uri = URI(weather_url)
        response = HTTParty.get(weather_url)
        response.parsed_response
    end
end
