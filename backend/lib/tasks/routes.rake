namespace :routes do
  desc 'Rails Routes'
  task :development do
    exec 'cd backend ; rails routes'
  end
end
task routes: 'routes:development'
