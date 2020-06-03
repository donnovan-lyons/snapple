class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.string :snake_image
      t.integer :score, default: 0
      t.integer :user_id
      t.boolean :completed, default: false

      t.timestamps
    end
  end
end
