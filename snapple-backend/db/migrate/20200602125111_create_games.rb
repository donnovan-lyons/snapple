class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.integer :score, default: 0
      t.string :skull
      t.string :apple
      t.integer :user_id
      t.boolean :completed, default: false

      t.timestamps
    end
  end
end
