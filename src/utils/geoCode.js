let request=require('request')
let geocode=(place, callBack)=>{
    let url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+place+'.json?access_token=pk.eyJ1IjoieWFkdW5hbmRhIiwiYSI6ImNra3k4dmw1aDFzbGkycG1wdXlhNHJsZW0ifQ.t-ivRLHO3hNgybz2G25Jtw&limit=1'
    request({url,json:true},(error,response)=>{
        if(error){
            callBack('Unable to make a connection with the server',undefined)
        }
        else if(response.body.features.length==0){
            callBack('Invalid input from the user', undefined)
        }
        else{
            callBack(undefined,{latitude:response.body.features[0].center[1],
                       longitude:response.body.features[0].center[0],
                       location:response.body.features[0].place_name})
        }
    
    })
    }
    
    module.exports=geocode