namespace :console do
  desc 'Rails Console'
  task :development do
    exec 'cd backend ; rails console'
  end
end
task console: 'console:development'
