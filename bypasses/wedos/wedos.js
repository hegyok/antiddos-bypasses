const { request } = require('undici');
const slowAES = require("../../util/aes")
const { sleep } = require("../../util/utils")

module.exports = class Wedos{
  constructor(url, log){
    this.url = url;
    this.log = log;
    this.cookie = null;
  }

  async bypass(){
    let { status, body } = await this._stage1()
    if(status == 200){
      this._log(`[Stage 1] No challenge.`)
      return body
    }
    let data = await this._stage2()
    return data;
  }

  async _stage2(){
    let response = await request(this.url, {
      headers: {
        cookie: this.cookie
      }
    })
    if(response.statusCode != 200) {
      this._log("[Stage 2] failed to bypass.")
      return null
    }
    this._log(`[Stage 2] Got response.`)
    let body = await response.body.text()
    return body
  }

  async _stage1(){
    let response = await request(this.url);
    let body = await response.body.text()
    if (response.statusCode == 200) return { status: response.statusCode, body }
    let output = { cookie: "", href: "" }
    let javascript = body.split("></script><script>")[1].split(";;</script>")[0].replace("1500", "0").replace("location", "output").replace("document", "output")
    eval(javascript)
    await sleep(2)
    output.cookie = output.cookie.split(";")[0]
    this._log(`[Stage 1] Got cookie: ${output.cookie}`)
    this.cookie = output.cookie
    return { status: 444 }
  }

  async _log(m){
    if(this.log) {
      console.log(m)
    }
  }
}