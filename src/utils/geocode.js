const fs=require('fs')
const request=require('request')
const api={
    key:'16cc4c5e60cc96c83babdd10ec6eea4e',
    geocodeurl:'https://api.openweathermap.org/data/2.5/forecast/daily?'
}


const location=(address,callback)=>{
request({url:`https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${api.key}`,json:true}, (error ,res)=>{
if(error) {
    console.log(error)
   
}
else {
    callback(res.body)
}

})
}
module.exports=location