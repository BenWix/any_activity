class ActivitiesController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create]

    def index 
        activities = Activity.all
        render json: activities, include: [:conditions]
    end
    
    def create
        activity = Activity.create(name: params[:name])
        params[:conditions].each do |cond|  
            activity.conditions.create(weather: cond["weather"], min_temp: cond["min_temp"], max_temp: cond["max_temp"])
        end
        # binding.pry
        render json: activity, include: [:conditions]
    end
end
