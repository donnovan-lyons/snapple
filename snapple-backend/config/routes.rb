Rails.application.routes.draw do
  get 'games/high_scores', to: 'games#high_scores'
  resources :games, only: [:show, :create, :update]
  get 'games/restore/:name', to: 'games#restore'
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
