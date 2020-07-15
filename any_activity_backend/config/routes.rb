Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/weather/:lat/:long', to: 'weather#show'
  resources :activities, only: [:index, :create]
end
