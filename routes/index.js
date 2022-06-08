// Full Documentation - https://docs.turbo360.co
const express = require('express')
const res = require('express/lib/response')
const router = express.Router()

/*  This is the home route. It renders the index.mustache page from the views directory.
  Data is rendered using the Mustache templating engine. For more
  information, view here: https://mustache.github.io/#demo */

// Important Handles: POST, GET, PUT, DELETE

const profiles = {

  Lennard: {
    username: "Lennard",
    image: "/images/pic.png",
    name: "Moe",
    occupation: "Programmer",
    language: ['javasript', 'swift', 'Python']
  },

  Bob:{
    username: "Bob",
    image: '/images/bgates.jpg',
    name: "the",
    occupation: "Builder",
    language: ['c', 'R', 'Go']
  },

  Joe:{
    username: "Joe",
    image: '/images/bgates.jpg',
    name: "Mama",
    occupation: "Jokster",
    language: ['javasript', 'react', 'css']
  },
}



  router.get('/', (req, res) => {
  res.render('index', { text: 'This is the dynamic data. Open index.js from the routes directory to see.' })
})


router.get('/profiles', (req, res) => {
  const keys = Object.keys(profiles)
  const list = []
  keys.forEach(key => {
    list.push(profiles[key])
  })

  
  const data = {
    profiles: list,
    timestamp: req.timestamp
  }

  res.render('profiles', data)
})

router.post('/createprofile', (req, res) => {
  const body = req.body
  body['language'] = req.body.language.split(', ')

  profiles[body.username] = body
  res.json({
    confirmation: "success",
    data: profiles[body.username]
  })
})




router.post('/addprofile', (req, res) => {
  const body = req.body
  body['language'] = req.body.language.split(', ')

  profiles[body.username] = body
  res.redirect('/profile/'+body.username)
})




// router.post("/post", (req, res) => {
//   const body = req.body //comes from POST form
  
//   res.json({
//     confirmation: "success",
//     data: body
//   })
// })




router.get("/query", (req, res) => {
  const name = req.query.name
  const occupation = req.query.occupation
  const data = {
    name: name,
    occupation: occupation
  }

  res.render("profile", data)

  // res.json({
  //     name: name,
  //     occupation: occupation
  // })
})

router.get("/:path", (req, res) => {
  const path = req.params.path
  res.json({
      data: path  
  })
})


router.get("/:profile/:username", (req, res) => {

  const profile = req.params.profile
  const username = req.params.username
  const currentProfile = profiles[username]

  if (currentProfile == null){
    res.json({
      confirmation: 'fail',
      message: 'Profile ' + username + ' not found'
    })

    return
  }

  currentProfile.timestamp = req.timestamp

  res.render('profile', currentProfile)

})















/*  This route render json data */
router.get('/json', (req, res) => {
  res.json({
    confirmation: 'success',
    app: process.env.TURBO_APP_ID,
    data: 'this is a sample json route.'
  })
})

/*  This route sends text back as plain text. */
router.get('/send', (req, res) => {
  res.send('This is the Send Route')
})

/*  This route redirects requests to Turbo360. */
router.get('/redirect', (req, res) => {
  res.redirect('https://www.turbo360.co/landing')
})

module.exports = router
