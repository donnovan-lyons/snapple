class Game < ApplicationRecord
    belongs_to :user, optional: true
    has_one :snake
    scope :top_ten, -> { where(completed: true).order('score DESC').limit(10) } # return's games with 10 highest scores
    scope :user_restore, -> (id) do #return's latest of that User's incompleted games
        where("(user_id = ?) AND (completed = ?)", id, false).order(created_at: :desc).limit(1)
    end
end
