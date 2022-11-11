module.exports = {
  Wedos: require("./bypasses/wedos/wedos")
}

const Wedos = require('./bypasses/wedos/wedos');
const wedos = new Wedos("https://trospy.eu", true)

async function test(){
  let data = await wedos.bypass()
  console.log(data)
}


test()


