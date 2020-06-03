class Snake < ApplicationRecord
    belongs_to :game, optional: true
end
