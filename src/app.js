const express=require('express')
const path=require('path')
const hbs=require('hbs')
const location=require('./utils/geocode')
const app=express()
const publicDirPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'naman'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Naman Vijay',
        About: 'About'

    })

})

app.get('/help',(req,res)=>{
    res.render('help',{
       helpText:" Hello please contact if you need help.",
       title :'Help',
       name : 'Naman'
    })

})

app.get('/weather',(req,res)=>{

    if(req.query.address)
    {
           location(req.query.address,(info)=>{

                             if(info.cod===200)
                              {


                             return  res.send({
                                 city:info.name,
                                 longitude:info.coord.lon,
                                 latitude:info.coord.lat,
                                 timezone:info.timezone,
                                 description:info.weather[0].description,
                                 temp:info.main.temp,
                                 wind:info.wind.speed
                            })
                        }
                        else{

                            return res.send({
                                error:'enter correct address'
                            })

                        }


            })
    }
    else{

    res.send({
        error:'Please enter address'
    })
}

           })



app.get('/products',(req,res)=>{

    if(!req.query.search){

        return res.send({
            error:'enter search field'
        })
    }
      res.send({
          product:[],
      })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        info:'Help article not found' ,
        title:'404'
    })
})


app.get('*',(req,res)=>{
    res.render('error',{
        info:'Page not found !' ,
        title : '404'
    })
})


app.listen(3000,()=>{
    console.log('server started on port 3000')
}) 
