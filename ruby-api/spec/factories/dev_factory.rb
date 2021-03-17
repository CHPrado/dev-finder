FactoryBot.define do
  factory :dev do
    username { Faker::Internet.username(separators: %w[- _]).upcase }
    notes { 'notes about dev' }
  end
end
