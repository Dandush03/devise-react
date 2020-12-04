namespace :rspec do
  desc 'Rspec'
  task :development do
    exec 'cd backend ; rspec'
  end
end
task rspec: 'rspec:development'
