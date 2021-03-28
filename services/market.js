const axios = require('axios')
const { curl } = require('../helper/curl')

const bdo = async () => {
    const url = `https://api.bdollar.fi/api/bdollar/get-token-info?token=BDO`
    const res = await curl(`curl ${url}`)
    console.log(res)
    let data = JSON.parse(res)
    console.log(data)
    if(!data){
        await bdo()
    }
    return data
}

module.exports = {
    bdo
}