const { json } = require("stream/consumers")

const { request } = require("http")
const express = require("express")
const { name } = require("ejs")
const path = require("path")
const fs = require("fs")
const { send } = require("process")
const app = express()

app.set('views','./views')
app.set("view engine",'ejs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'styles')))

app.get("/",(req,res) => {
    fs.readFile("./Databases/data.json","utf8", (err,data) => {
        res.render("index.ejs",{data:JSON.parse(data)})
    })
})
app.get("/increase",(req,res) => {
    fs.readFile("./Databases/data.json","utf8", (err,data) => {
        res.render("increase.ejs",{data:JSON.parse(data)})
    })
})
app.post("/data", (req,res) => {
    fs.readFile("./Databases/data.json","utf8",(err,data) => {
      let jsonData = JSON.parse(data)
      jsonData.Number += req.body.change;
      
      fs.writeFile("./Databases/data.json", JSON.stringify(jsonData,null,4),
      (err) => {
        res.json({ Number:jsonData.Number})
      })
    })
})
app.get("/data",(req,res) => {
    res.json(JSON.parse(fs.readFileSync("./Databases/data.json")))
})
app.post("/reset",(req,res) => {
    let Data = JSON.parse(fs.readFileSync("./Databases/data.json"))
    Data.Number = 0
    fs.writeFile("./Databases/data.json",JSON.stringify(Data,null,4),
    (err) => {
        res.json ({ Number:Data.Number})
    })
})
app.listen(3001,() => {
    console.log("Hello New Project")
})