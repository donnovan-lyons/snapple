class CreateSnakes < ActiveRecord::Migration[5.2]
  def change
    create_table :snakes do |t|
      t.string :body
      t.string :direction
      t.integer :game_id

      t.timestamps
    end
  end
end
