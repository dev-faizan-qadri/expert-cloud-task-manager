# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
# db/seeds.rb
require 'faker'

# Clear old data
Task.destroy_all
User.destroy_all

# Create demo user
demo_user = User.create!(
  email: 'demo@example.com',
  password: 'password123',
  password_confirmation: 'password123'
)

# Create 10 sample tasks for demo user
10.times do
  Task.create!(
    title: "#{Faker::Verb.base.titleize} #{Faker::Commerce.product_name.split.first}",
    description: Faker::Lorem.paragraph(sentence_count: 2),
    completed: [ true, false ].sample,
    user: demo_user
  )
end

# Optional: seed extra users
3.times do
  user = User.create!(
    email: Faker::Internet.unique.email,
    password: 'password123',
    password_confirmation: 'password123'
  )

  rand(3..7).times do
    Task.create!(
      title: Faker::Job.title,
      description: Faker::Lorem.sentence(word_count: 12),
      completed: [ true, false ].sample,
      user: user
    )
  end
end
