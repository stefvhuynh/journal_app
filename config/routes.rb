Rails.application.routes.draw do
  root to: "root#root"
  namespace :api do
    resources :posts
  end
end
