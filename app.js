const express = require('express');
const bodyParser = require('body-parser')
const { sendMessage } = require('./services/send')
const { bdo, sBdo } = require('./services/market');
const send = require('./services/send');
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
    let time = 0;
    const main = async () => {
        const token = `TnjGoDfNrCYXYY18nngjndEVX3yHU1huPstDbm2tHrt`
        const bdoPrice = await bdo()
        const sBdoPrice = await sBdo()
        try {
            const { price } = bdoPrice.data
            const sBdoRate = sBdoPrice.data.price
            console.log('new price => ', price, ' ,old price =>', stantPrice, ' ,1% => ', stantPrice*1.01)
            console.log('sBdo rate =>', sBdoRate)
            console.log('time:', time)
            if(price >= (stantPrice*1.01)) {
                await sendMessage(token, `^1%\nBDO => ${price.toFixed(3)}$`)
                stantPrice = price
            }
            if(time == 6){
                time = 0
                await sendMessage(token, `Rate\nBDO => ${price.toFixed(3)}$\nsBDO => ${sBdoRate.toFixed(3)}$`)
            }
            time++
            await sleep(120000)
            main()
        } catch (err) {
            main()
        }

    }    

    main()
})()