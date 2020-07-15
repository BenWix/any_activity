class ActivitiesController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create]

    def index 
        activities = Activity.all
        render json: activities
    end
    
    def create
        activity = Activity.create(name: params[:name])
        render json: activity
    end

end
