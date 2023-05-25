var express = require('express');
var fs = require('fs');
const path = require("path");
var router = express.Router();
const GetId = require('../../utils/ssid');
var apiRes = require('../../utils/apiInfo');
//清空文本
function clearFile(filename) {
  // 写入文件是异步过程，需要使用promise保证文件操作完成 
  return new Promise(resolve => {
    let str = path.join(__dirname, `/store/${filename}`);
    fs.writeFile(str, '', "utf-8", function (err) {
      if (err) {
        throw new Error("写入数据失败");
      } else {
        resolve()
      }
    });
  })
}

router.get(`/getUserInfo`, async function (req, res, next) {
  const data = await fs.readFileSync(__dirname + '/store/data.txt');
  const id = await fs.readFileSync(__dirname + '/store/id.txt');
  const result = JSON.parse(JSON.stringify(apiRes.successObj));
  const errorInfo = JSON.parse(JSON.stringify(apiRes.errorObj));
  console.log(JSON.parse(data.toString()));
  if (req.query.uid === id.toString()) {
    result.data = JSON.parse(data.toString())
    res.status(200).send(result)
  }else {
    res.status(403).send(errorInfo)
  }
});
router.post(`/login`, async (req, res) => {
  const result = JSON.parse(JSON.stringify(apiRes.successObj));
  const errorInfo = JSON.parse(JSON.stringify(apiRes.errorObj));
  try {
    if (req.body && req.body.kl === "14381438") {
      const ssid = GetId.getUniqueId();
      console.log(__dirname);
      await clearFile('id.txt');
      // 读取文件内容
      const filePath = __dirname + '/store/id.txt';
      fs.writeFile(filePath, ssid, function (err) {
        // 2.1 如果文件写入成功,则err的值等于null
        // 2.2 如果文件写入失败,则err的值等于有个错误对象
        console.log(err);
      })
      result.data.uid = ssid;
      res.status(200).send(result);
    } else {
      res.status(500).send(errorInfo);
    }
  } catch (error) {
    console.error(JSON.stringify(error));
    errorInfo.data = JSON.stringify(error) === {} ? JSON.stringify(error) : 'error';
    res.status(500).send(errorInfo);
  }
});

module.exports = router;