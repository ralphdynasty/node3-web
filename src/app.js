const express = require('express')
const path = require ('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

console.log(partialsPath)


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather', 
        name: 'Ralph'
    })
})
app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About',
        name:'Ralph'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        content: 'Help me',
        title: 'Help',
        name: 'Ralph'
    })
})

app.get('/weather',(req,res)=> {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a search address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
    if(error){
        return res.send ({error})
    }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({            
                location,
                address: req.query.address,
                forecast: forecastData
            })

        })
    } )

    
})

app.get('/help/*',(req,res)=> {
    res.render('page404',{
        message:'Help article not found',
        name: 'Ralph',
        title: '404'
    })
})

app.get('*',(req,res)=> {
    res.render('page404',{
        message:'Page not found',
        name: 'Ralph',
        title: ' 404'
    })
})


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})