const axios = require("axios");
const { curl } = require("../helper/curl");

const bdo = async () => {
  const url = `https://api.bdollar.fi/api/bdollar/get-token-info?token=BDO`;
  try {
    const res = await curl(`curl ${url}`);
    console.log(JSON.parse(res));
    return JSON.parse(res);
  } catch (err) {
    return await bdo();
  }
};

const sBdo = async () => {
  const url = `https://api.bdollar.fi/api/bdollar/get-token-info?token=sBDO`;
  const res = await curl(`curl ${url}`);
  try {
    const res = await curl(`curl ${url}`);
    console.log(JSON.parse(res));
    return JSON.parse(res);
  } catch (err) {
    return await bdo();
  }
};

module.exports = {
  bdo,
  sBdo,
};
