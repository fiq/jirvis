Rails.application.routes.draw do
  root 'pages#home'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: {format: 'json'}  do
    namespace :v1 do
      resources :projects do
      end
      resources :issues do
      end
    end
  end
end
