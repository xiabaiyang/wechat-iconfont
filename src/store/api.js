import api from 'create-api'

// 15分钟更新前端页面缓存
// if (api.cachedIds) {
//   warmCache()
// }

// function warmCache () {
//   fetchItems((api.cachedIds.red || []).slice(0, 30))
//   setTimeout(warmCache, 1000 * 60 * 15)
// }

// 上传文件
export function uploadSvg (file) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://104.131.78.218:3000/file_upload");
        // xhr.open("POST", "http://127.0.0.1:3000/file_upload");
        xhr.onload = function (e) {
            var res = JSON.parse(this.response);
            console.log(res);
            if (res.status === 200) {
                resolve(res.data);
            }
            else {
                reject(res.msg); // 返回错误信息
            }
        }
        xhr.send(file);
    });
}

// 获取文件地址
export function fetchFileAddr (type) {
    return new Promise((resolve, reject) => {
        let reqAddr = 'http://104.131.78.218:3000/getFileAddr?type=' + type;
        // let reqAddr = 'http://127.0.0.1:3000/getFileAddr?type=' + type;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", reqAddr);
        xhr.onload = function (e) {
            var res = JSON.parse(this.response);
            if (this.status === 200) {
                resolve(res.data);
            }
            else {
                reject(res.msg); // 返回错误信息
            }
        };
        xhr.send();

    //   api.get('http://localhost:3000/getFileAddr')
    //             .query({ type: type })
    //             .end((err, res) => {
    //                  if (err) {
    //                    console.log(err);
    //                    reject(err);
    //                  }
    //                  else {
    //                    resolve(res);
    //                   //  console.log(res);
    //                   //  console.log('addr get');
    //                   //  console.log(res);
    //                  }
    //             })
    })
}

// 下载文件
export function downloadSvg (fileName) {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", "http://104.131.78.218:3000/file/" + fileName);
    oReq.send();

    // api.get('http://localhost:3002/file')
    //    .end((err, res) => {
    //      if (err) {
    //        console.log('upload');
    //      }
    //      else {
    //        console.log('fail');
    //      }
    // })
}

// 下载文件
export function packSvg (type) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://104.131.78.218:3000/pack?type=" + type);
        // xhr.open("GET", "http://127.0.0.1:3000/pack?type=" + type);
        xhr.onload = function (e) {
           var res = JSON.parse(this.response);
           if (this.status === 200) {
               resolve(res.data);
           }
           else {
               reject(res.msg); // 返回错误信息
           }
        }
        xhr.send();
    })
}

// 获取文件细节
export function getSvgDetail (path) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        // xhr.open("GET", "http://104.131.78.218:3000/getDetail?path=" + path);
        xhr.open("GET", "http://104.131.78.218:3000/getDetail?path=" + path);
        xhr.onload = function (e) {
           var res = JSON.parse(this.response);
           if (this.status === 200) {
               resolve(res.data);
           }
           else {
               reject(res.msg); // 返回错误信息
           }
        }
        xhr.send();
    })
}
