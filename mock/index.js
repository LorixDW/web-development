const express = require('express')
const app = express();

let entities = []
let user = []
let apiLAST = 0

app.get('/', (req, res) => {
    res.send("Hello world")
    console.log("get request - /")
})

app.get('/user', (req, res) => {
    if(req.query['email'] != undefined && req.query['password'] != undefined){
        let key = user.find(value => {
            if(value['email'] == req.query['email'] && value['password'] == req.query['password']){
                return value['appid']
            }
        })
        if(key != undefined){
            res.send({appid: key['appid']})
        }else {
            res.status(404).send('Not found user')
        }
    }
    else{
        res.status(400).send('Fail')
    }
})
app.get('/users', (req, res) => {
    res.send(user)
})

app.post('/user', (req, res) => {
    if(req.query['email'] != undefined && req.query['password'] != undefined){
        let user_ = user.filter(value => {
            if(value['email'] == req.query['email']) {
                return value
            }
        })
        if(user_.length == 0){
            user.push({
                email: req.query['email'],
                password: req.query['password'],
                appid: apiLAST.toString()
            })
            apiLAST = apiLAST + 1
            res.status(200).send('Ok')
        }
        else {
            res.status(404).send('Already exists')
        }
    }
    else {
        res.status(400).send('Fail')
    }
})

app.get('/entity', (req, res) => {
    let key = req.query['appid']
    if(user.filter(value => {
        if(value['appid'] == key){
            return value;
        }
    }).length > 0){
        if(req.query['type'] == 'vegetable' || req.query['type'] == 'fruit'){
            res.status(200).send(entities.filter(value => {
                if(value['type'] == req.query['type']){
                    return value
                }
            }))
        }
        else if(req.query['type'] == undefined){
            res.send(entities)
        }
        else {
            res.status(404).send('Wrong query')
        }
    }
    else {
        res.status(403).send('Unauthorized')
    }
})

app.post('/entity', (req, res) => {
    let key = req.query['appid']
    if(user.filter(value => {
        if(value['appid'] == key){
            return value;
        }
    }).length > 0){
        if((req.query['type'] == 'vegetable' || req.query['type'] == 'fruit') && req.query['Name'] != undefined)
        {
            res.status(200).send('Ok')
            entities.push({
                type: req.query['type'],
                Name: req.query['Name']
            })
        }
        else {
            res.status(400).send('Fail')
        }
    }else {
        res.status(403).send('Unauthorized')
    }

    console.log(`post request /entity :`, req.query)
})

app.listen(4000, () => {

    console.log('Listning on port 4000')
})