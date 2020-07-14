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
        weather_url = "api.openweathermap.org/data/2.5/weather?lat=#{@lat}&lon=#{@long}&appid=#{@key}"
    
        uri = uri.parse(weather_url)
        response = Net::HTTP.get_response(uri)
        
    
    end
end
