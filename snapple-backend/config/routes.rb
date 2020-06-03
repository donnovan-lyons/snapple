Rails.application.routes.draw do
  # resources :consumables
  # resources :snakes
  get 'games/high_scores', to: 'games#high_scores'
  resources :users, only: [:index, :show]
  # resources :games
  # resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
