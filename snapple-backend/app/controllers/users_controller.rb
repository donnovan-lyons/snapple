class UsersController < ApplicationController
    def index
        users = User.all
        render json: users, :only => [:id,:name]
        # render json: sightings, include: [:bird, :location]
    end
    
    def show
        user = User.find_by(id: params[:id])
        render json: UserSerializer.new(user).to_serialized_json
    end
end