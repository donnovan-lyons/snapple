class Api::V1::GamesController < ApplicationController
    require 'json'
    
    def high_scores
        games = Game.top_ten
        render json: GameSerializer.new(games).to_serialized_json
    end

    def show
        game = Game.find(params[:id])
        render json: GameSerializer.new(game).to_serialized_json
    end

    def create
        user = User.find_or_create_by(name: params[:name])
        game = user.games.create()
        game.create_snake
        redirect_to game_path(game)
    end

    def update
        game = Game.find(params[:id])
        snake_data = snake_params.to_h
        snake_body = snake_data[:body].map {|body_part| body_part.to_json }
        snake = game.snake
        snake.update(direction: snake_data[:direction], body: snake_body)
        game.update(skull: "[#{params[:skull][:x]},#{params[:skull][:y]}]", apple: "[#{params[:apple][:x]},#{params[:apple][:y]}]", score: params[:score], completed: params[:completed])
    end

    def restore
        user = User.find_or_create_by(name: params[:name])
        game = Game.user_restore(user.id)
        render json: GameSerializer.new(game).to_serialized_json
    end

    private

    def snake_params
        params.require(:snake).permit(:direction, body: [:x, :y])
    end
end

