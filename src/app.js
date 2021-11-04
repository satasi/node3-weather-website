//down below is core module, we dont need to install it
const path = require('path')
//down below is npm module, we need to install it
const express = require('express')
const hbs = require('hbs')
//src is a directory
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//to get handlebars setup, and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//it is used to customize the server, setup static directory to serve
//express will look for a match in public folder for whatever is searched
// and then it will look forward for further app.get commands
app.use(express.static(publicDirectoryPath))
//app.get is setting routes for urls
app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather app',
        name : 'Andrew mead'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Andrew mead'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText : 'This is some helpful text',
        title:'Help',
        name: 'Andrew mead'
        

    })
})
// down below func describes what to send back the user when he visits url

app.get('', (req, res)=>{
    res.send('<h1>Weather</h2>')

})

// app.get('/help', (req, res)=>{
//     res.send({
//         name: 'Andrew',
//         age: 27
//     })

// })

// app.get('/about',(req, res)=>{
//     res.send('<h1>About</h1>')
// })
//down below is sending back json, which is object or can be array of objects
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {} )=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })

    // res.send({
    //     forecast:'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.search
    // })
})


app.get('/products', (req, res) =>{
    //we can send back a single response from server to browser
    // that is why a return is used
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Andrew mead',
        errorMessage:'Help article not found.'
    })
})
// star means match everything that is not matched yet
app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Andrew mead',
        errorMessage: 'Page not found.'
    })

})
//it starts up the server
app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})