# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Condition.delete_all
Activity.delete_all

read = Activity.create(name: "read a book")
read.conditions.create(weather: "rainy", min_temp: -100, max_temp: 100)

run = Activity.create(name: "go for a run")
run.conditions.create(weather: "clear", min_temp: 50, max_temp: 90)
run.conditions.create(weather: "cloudy", min_temp: 50, max_temp: 90)


nap = Activity.create(name: "take a nap")
nap.conditions.create(weather: "cloudy", min_temp: -100, max_temp: 100)
nap.conditions.create(weather: "rainy", min_temp: -100, max_temp: 100)
nap.conditions.create(weather: "misting", min_temp: -100, max_temp: 100)

museum = Activity.create(name: "go to a museum")
museum.conditions.create(weather: "cloudy", min_temp: -100, max_temp: 100)
museum.conditions.create(weather: "rainy", min_temp: -100, max_temp: 100)
museum.conditions.create(weather: "misting", min_temp: -100, max_temp: 100)


sledding = Activity.create(name: "go sledding")
sledding.conditions.create(weather: "snowing", min_temp: -100, max_temp: 30)

bike = Activity.create(name: "go for a bike ride")
bike.conditions.create(weather: "clear", min_temp: 45, max_temp: 100)
bike.conditions.create(weather: "cloudy", min_temp: 45, max_temp: 100)

watch = Activity.create(name: "watch the storm roll in")
watch.conditions.create(weather: "storming", min_temp: -100, max_temp: 100)

swimming = Activity.create(name: "go for a swim")
swimming.conditions.create(weather: "clear", min_temp: 50, max_temp: 100)

yoga = Activity.create(name: "do some yoga")
yoga.conditions.create(weather: "any", max_temp: 100, min_temp:-100)