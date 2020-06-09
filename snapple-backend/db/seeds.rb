# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user_a = User.create(name: "Donnovan")
user_b = User.create(name: "Phil")

snake_a  = Snake.create(direction: "up")
snake_b = Snake.create(direction: "down")
snake_c  = Snake.create(direction: "up")
snake_d = Snake.create(direction: "down")
snake_e  = Snake.create(direction: "up")
snake_f = Snake.create(direction: "down")
snake_g  = Snake.create(direction: "up")
snake_h = Snake.create(direction: "down")
snake_i  = Snake.create(direction: "up")
snake_j = Snake.create(direction: "down")
snake_k  = Snake.create(direction: "up")

game_a = user_a.games.create(snake: snake_a, skull: "{x: 16 , y: 14}", apple: "{x: 16 , y: 14}", completed: true)
game1 = user_a.games.create(snake: snake_b, skull: "{x: 16 , y: 14}", apple: "{x: 16 , y: 14}", score: 20, completed: true)
game2 = user_a.games.create(snake: snake_c, skull: "{x: 16 , y: 14}", apple: "{x: 16 , y: 14}", score: 30, completed: true)
game3 = user_a.games.create(snake: snake_d, skull: "{x: 16 , y: 14}", apple: "{x: 16 , y: 14}", score: 40, completed: true)
game4 = user_a.games.create(snake: snake_e, skull: "{x: 16 , y: 14}", apple: "{x: 16 , y: 14}", score: 50, completed: true)
game5 = user_a.games.create(snake: snake_f, skull: "{x: 16 , y: 14}", apple: "{x: 16 , y: 14}", score: 60, completed: true)
game6 = user_b.games.create(snake: snake_g, skull: "{x: 16 , y: 14}", apple: "{x: 16 , y: 14}", score: 70, completed: true)
game7 = user_b.games.create(snake: snake_h, skull: "{x: 16 , y: 14}", apple: "{x: 16 , y: 14}", score: 80, completed: true)
game8 = user_b.games.create(snake: snake_i, skull: "{x: 16 , y: 14}", apple: "{x: 16 , y: 14}", score: 90, completed: true)
game9 = user_b.games.create(snake: snake_j, skull: "{x: 16 , y: 14}", apple: "{x: 16 , y: 14}", score: 100, completed: true)
game10 = user_b.games.create(snake: snake_k, skull: "{x: 16 , y: 14}", apple: "{x: 16 , y: 14}", score: 120, completed: true)