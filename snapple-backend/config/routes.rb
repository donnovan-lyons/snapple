Rails.application.routes.draw do
  resources :games, only: [:show, :create, :update]
  get 'games/high_scores', to: 'games#high_scores'
  get 'games/restore/:name', to: 'games#restore'
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
