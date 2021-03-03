const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geoCode')
const forecast=require('./utils/forecast')

//new var to store our express application
const app=express()



//Paths for express()
let publicDirectoryPath=path.join(__dirname,'../public')
let viewsPath=path.join(__dirname, '../templates/views')
let partialsPath=path.join(__dirname,'../templates/partials')
let port = process.env.PORT || 3000
console.log(partialsPath);



//Setting up handlebars in express
app.set("view engine",'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)




app.use(express.static(publicDirectoryPath,{extensions:['html']})
)

//for the index page
app.get('',(req,res)=>{res.render('index',{name:'Yadunanda',place:"hyderabad",message:"Thanks you visit again"})})

//for the about page
app.get('/about',(req,res)=>{res.render('about',{name:"yadunanda",place:'ottawa',message:"Thanks you visit again"})})

//for the help page 
app.get('/help',(req,res)=>{res.render('help',{name:'Helpful notes',message:"Thanks you visit again"})})

//products page 
app.get('/products',(req,res)=>{
    if(!req.query.name){
      return  res.send({error:'Please enter the search item'})
    }
     console.log(req.query);
    
    res.send({products:[]})})




app.get('/weather',(req,res)=>{
  if(!req.query.address){
      return(res.send({error:"please add your address"}))
  }
  
  geocode(req.query.address,callBack=(error, response)=>{
    if(error){
      return res.send({errormessage:error});
    }

    let {latitude, longitude}=response
  
  forecast(latitude,longitude, (error, data) => {
      if(error){
          return res.send({errormessage:error});
      }
      res.send({
        location:response.location,
        temp:data,
        address:req.query.address
    })
    console.log(response.location);
    console.log(data);
  })

  })

})



app.get('/help/*',(req,res)=>{res.render('error',{messageone:"Help article not found-Help error"})})

app.get('*',(req,res)=>{res.render('error',{messageone:"Page not found-normal error"})})
//app.com
//app/help
//app.com/about   //the domain app .com all of it is going to run on a single server

app.listen(port,()=>{console.log("Hi this is yadunanda's server in port 3000")})