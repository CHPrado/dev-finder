Rails.application.routes.draw do
  resources :devs, only: [:create, :index] do
    get ':username' => 'devs#show', on: :collection
  end
end
