class Consumable < ApplicationRecord
    belongs_to :game, optional: true
end
