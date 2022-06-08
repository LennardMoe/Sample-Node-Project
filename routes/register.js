const express = require('express')
const res = require('express/lib/response')
const router = express.Router()

router.post("/user", (req, res) => {
    const body = req.body //comes from POST form
  
    res.json({
      confirmation: "success",
      route: 'register', 
      data: body
    })
})




module.exports = router