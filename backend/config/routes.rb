# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users

  namespace :api, constraints: { format: 'json' } do
    namespace :auth do
      devise_for :users
    end
  end
  # Ex:- :default =>''
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
