Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :games do
        # custom route collection
        collection do
          get 'high_scores', to: 'games#high_scores'
          get 'restore/:name', to: 'games#restore'
        end
      end
      resources :games, only: [:show, :create, :update]
    end
  end
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
