class CreateConsumables < ActiveRecord::Migration[5.2]
  def change
    create_table :consumables do |t|
      t.string :position
      t.integer :game_id

      t.timestamps
    end
  end
end
