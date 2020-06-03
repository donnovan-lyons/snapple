class GamesController < ApplicationController
    def high_scores
        games = Game.top_ten
        render json: GameSerializer.new(games).to_serialized_json
    end
end

