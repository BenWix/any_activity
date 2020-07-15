class ActivitiesController < ApplicationController

    def index 
        @activities = Activity.all
    end
    
    def create

    end

end
