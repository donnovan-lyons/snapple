class Game < ApplicationRecord
    belongs_to :user, optional: true
    has_one :snake
    scope :top_ten, -> { where(completed: true).order('score DESC').limit(10) }
    scope :user_restore, -> (id) do #where user id present and latest of that User's completed false games
        where("(user_id = ?) AND (completed = ?)", id, false).order(created_at: :desc).limit(1)
    end
end
