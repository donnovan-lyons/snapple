# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user_a = User.create(name: "Donnovan")
user_b = User.create(name: "Phil")

snake_a  = Snake.create(body: "[{x: 13, y: 19}, {x: 12, y: 19}, {x: 11, y: 19}]")
snake_b = Snake.create(body: ["{x: 19, y: 2}, {x: 19, y: 3}, {x: 19, y: 4}"])

skull = Consumable.create(position: "{x: 16 , y: 14}")
apple= Consumable.create(position: "{x: 13 , y: 3}")

game_a = user_a.games.create(snake: snake_a, consumables: [skull, apple])
