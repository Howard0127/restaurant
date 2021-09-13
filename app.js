// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')

// require express-handlebars here
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  const restaurants = restaurantList.results
  res.render('index', { restaurants })
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurantList.results.find(
    (item) => item.id.toString() === id
  )
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const keywordLow = keyword.toLowerCase()
  const keywordArr = keywordLow.split(' ')

  let filteredRestaurant = []
  for (restaurant of restaurantList.results) {
    const restaurantName = restaurant.name.toLowerCase()
    const restaurantCategory = restaurant.category.toLowerCase()

    if (
      keywordArr.find(
        (word) =>
          restaurantName.includes(word) || restaurantCategory.includes(word)
      )
    )
      filteredRestaurant.push(restaurant)
  }

  res.render('index', { restaurants: filteredRestaurant, keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost: ${port}`)
})
