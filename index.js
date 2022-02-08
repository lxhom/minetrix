let express = require('express')
let app = express()
let mc = require('minecraft-lib')

app.get('/api/:server', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  try {
    let s = await mc.servers.get(req.params.server)
    res.json(s)
  } catch(e) { res.json({error: true}) }
})

app.use(express.static('frontend/public'))

// module.exports = app
app.listen(process.env.PORT)
