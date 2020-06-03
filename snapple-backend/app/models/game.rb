class Game < ApplicationRecord
    belongs_to :user, optional: true
    has_one :snake
    has_many :consumables
    scope :top_ten, -> { where(completed: true).order('score DESC').limit(10) }
end
