class ActivitiesController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create]

    def index 
        activities = Activity.all
        render json: activities, include: [:conditions]
    end
    
    def create
        binding.pry
        activity = Activity.create(name: params[:name])
        render json: activity, include: [:conditions]
    end

end
