const fs = require('fs')
const http = require('http')
const file = fs.readFileSync('index.html', 'utf-8')
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"))

const product = data.products

const server = http.createServer((req, res)=>{
 if (req.url.startsWith('/product')){
  const id = req.url.split("/")[2]
  const findProductId = product.find(p=>p.id === (+id))
  console.log(findProductId)
  res.setHeader("content-type", "text/html")

  let modifiedIndex = file.replace('**Product Name**', findProductId.title)
  .replace('**image**', findProductId.thumbnail)
  .replace('**price**', findProductId.price)
  .replace('**less**', findProductId.discountPercentage)
  res.end(modifiedIndex);
  return;

 }




  switch (req.url){
    case "/":
      res.setHeader("content-type", "text/html")
      res.end(file)
       break
    case "/api":
    res.setHeader("content-type", "application/json")

      res.end(JSON.stringify(data))
      break
    default:
      res.writeHead(404)
      res.end()
      break
  }
})

server.listen(4050)