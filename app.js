const express = require('express');
const bodyParser = require('body-parser')
const { sendMessage } = require('./services/send')
const { bdo } = require('./services/market')
const app = express()

app.listen(7777)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/', async (req, res) => {
    await sendMessage(req.body.token, req.body.message)
})

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

;(async () => {
    let stantPrice = 0;
    const main = async () => {
        const token = `TnjGoDfNrCYXYY18nngjndEVX3yHU1huPstDbm2tHrt`
        const res = await bdo()
        try {
            const { price } = res.data
            console.log('new price => ', price, ' ,old price =>', stantPrice, ' ,1% => ', stantPrice*1.01)
            if(price >= (stantPrice*1.01)) {
                await sendMessage(token, `BDO up 1% => ${price}$`)
                stantPrice = price
            }
            // console.log(stantPrice)
            await sleep(60000)
            main()
        } catch (err) {
            main()
        }

    }    

    main()
})()