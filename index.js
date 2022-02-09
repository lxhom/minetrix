let express = require('express')
let app = express()
let mc = require('minecraft-lib')

const timeout = 2000

let cache = []
let cleanCache = () => cache = cache.filter((e,i,a) => ((e.time + timeout) - (+new Date)) > 0 &&
    a.filter(ee => ee.request === e.request).length === 1)
let addToCache = (request, data) => cache.push({request, data, time: +new Date})
let getFromCache = request => { cleanCache(); return cache.filter(e => e.request === request)[0]}
let getServerInfo = async url => {
  let data = getFromCache(url);
  if (data) { return data.data } else {
    let s = await mc.servers.get(url)
    addToCache(url, s)
    return s;
  }
}

app.get('/api/:server', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  try {
    let s = await getServerInfo(req.params.server)
    res.json(s)
  } catch(e) { res.json({error: e}) }
})

app.get('/cli/:server', async (req, res) => {
  try {
    let data = await getServerInfo(req.params.server)
    let str = `${data.host} (${data.version_from_protocol}, ${data.players.online}/${data.players.max}):\n`
    for (let player of data.players.sample.sort((a,b)=>a.username>b.username)) {
      str += '⬡ ' + player.username + '\n'
    }
    res.send(str)
  } catch(e) { res.json({error: e}) }
})

app.get('/cli/', (req, res) => {
  res.send('Usage: curl /cli/[server.tld]')
})

app.use(express.static('frontend/public'))

app.listen(process.env.PORT)
