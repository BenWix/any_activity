class ActivitiesController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create]

    def index 
        activities = Activity.all
        render json: activities, include: [:conditions]
    end
    
    def create
        binding.pry
        activity = Activity.create(name: params[:name])
        params[:conditions].forEach |cond| do 
            activity.conditions.create(weather: cond["weather"], min_temp: cond["min_temp"], max_temp: cond["max_temp"])
        end
        render json: activity, include: [:conditions]
    end
end
