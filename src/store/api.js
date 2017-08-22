import api from 'create-api'
import jQuery from 'jquery';

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
    // return new Promise((resolve, reject) => {
        // let xhr = new XMLHttpRequest();
        // // xhr.open("POST", "http://104.131.78.218:3000/file_upload"); 
        // xhr.open("POST", "http://127.0.0.1:3000/users/upload?sig=fed9a4cfd84605486dc79df5eedfa3e3");
        // xhr.onload = function (e) {
        //     var res = JSON.parse(this.response);
        //     console.log(res);
        //     if (res.status === 200) {
        //         resolve(res.data);
        //     }
        //     else {
        //         reject(res.msg); // 返回错误信息
        //     }
        // }
        // xhr.send(file);

        // let xhr = new XMLHttpRequest();
        // // xhr.open("post", "http://123.207.94.56:3000/users/uploadHtml"); //123.207.94.56
        // xhr.open("post", "http://127.0.0.1:3000/users/upload?sig=fed9a4cfd84605486dc79df5eedfa3e3&author=xby");
        // xhr.onload = function (e) {
        //     var res = JSON.parse(this.response);
        //     console.log(res);
        //     if (res.status === 200) {
        //         resolve(res.data);
        //     }
        //     else {
        //         reject(res.msg); // 返回错误信息
        //     }
        // }
        // xhr.send(file);
    // });

    // jQuery.ajax({
    //    type: "POST",
    //    url: 'http://127.0.0.1:3000/users/version_check',
    //    traditional:true,
    //    data:{
    //         sig: 'fed9a4cfd84605486dc79df5eedfa3e3',
    //         projectid: 7,
    //         list: JSON.stringify(['aaa.svg', 'bbb.svg', 'ccc.svg'])
    //    },
    //    dataType: "json",
    //    async: false
    // });


    // jQuery.ajax({
    //    type: "POST",
    //    url: 'http://127.0.0.1:3000/users/batch_upload',
    //    traditional:true,
    //    data:{
    //         sig: 'fed9a4cfd84605486dc79df5eedfa3e3',
    //         list: JSON.stringify([{
    //             name: 'gg.svg',
    //             author: 'xby',
    //             content: '%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%0A%3Csvg%20width%3D%22202px%22%20height%3D%22255px%22%20viewBox%3D%220%200%20202%20255%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3C!--%20Generator%3A%20Sketch%2044.1%20(41455)%20-%20http%3A%2F%2Fwww.bohemiancoding.com%2Fsketch%20--%3E%0A%20%20%20%20%3Ctitle%3ERectangle%3C%2Ftitle%3E%0A%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3Crect%20id%3D%22path-1%22%20x%3D%2274%22%20y%3D%2296%22%20width%3D%22202%22%20height%3D%22255%22%3E%3C%2Frect%3E%0A%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0A%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Artboard%22%20transform%3D%22translate(-74.000000%2C%20-96.000000)%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Rectangle%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20fill%3D%22%23D8D8D8%22%20fill-rule%3D%22evenodd%22%20xlink%3Ahref%3D%22%23path-1%22%3E%3C%2Fuse%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20stroke%3D%22%23979797%22%20stroke-width%3D%221%22%20x%3D%2274.5%22%20y%3D%2296.5%22%20width%3D%22201%22%20height%3D%22254%22%3E%3C%2Frect%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E',
    //             projectId: 1,
    //             remarks: 'zzz'
    //         }
    //         , {
    //             name: 'bb.svg',
    //             author: 'xby',
    //             content: '%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%0A%3Csvg%20width%3D%22202px%22%20height%3D%22255px%22%20viewBox%3D%220%200%20202%20255%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3C!--%20Generator%3A%20Sketch%2044.1%20(41455)%20-%20http%3A%2F%2Fwww.bohemiancoding.com%2Fsketch%20--%3E%0A%20%20%20%20%3Ctitle%3ERectangle%3C%2Ftitle%3E%0A%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3Crect%20id%3D%22path-1%22%20x%3D%2274%22%20y%3D%2296%22%20width%3D%22202%22%20height%3D%22255%22%3E%3C%2Frect%3E%0A%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0A%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Artboard%22%20transform%3D%22translate(-74.000000%2C%20-96.000000)%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Rectangle%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20fill%3D%22%23D8D8D8%22%20fill-rule%3D%22evenodd%22%20xlink%3Ahref%3D%22%23path-1%22%3E%3C%2Fuse%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20stroke%3D%22%23979797%22%20stroke-width%3D%221%22%20x%3D%2274.5%22%20y%3D%2296.5%22%20width%3D%22201%22%20height%3D%22254%22%3E%3C%2Frect%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E',
    //             projectId: 1,
    //             remarks: 'zzz'
    //         },
    //         {
    //             name: 'mm.svg',
    //             author: 'xby',
    //             content: '%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%0A%3Csvg%20width%3D%22202px%22%20height%3D%22255px%22%20viewBox%3D%220%200%20202%20255%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3C!--%20Generator%3A%20Sketch%2044.1%20(41455)%20-%20http%3A%2F%2Fwww.bohemiancoding.com%2Fsketch%20--%3E%0A%20%20%20%20%3Ctitle%3ERectangle%3C%2Ftitle%3E%0A%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3Crect%20id%3D%22path-1%22%20x%3D%2274%22%20y%3D%2296%22%20width%3D%22202%22%20height%3D%22255%22%3E%3C%2Frect%3E%0A%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0A%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Artboard%22%20transform%3D%22translate(-74.000000%2C%20-96.000000)%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Rectangle%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20fill%3D%22%23D8D8D8%22%20fill-rule%3D%22evenodd%22%20xlink%3Ahref%3D%22%23path-1%22%3E%3C%2Fuse%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20stroke%3D%22%23979797%22%20stroke-width%3D%221%22%20x%3D%2274.5%22%20y%3D%2296.5%22%20width%3D%22201%22%20height%3D%22254%22%3E%3C%2Frect%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E',
    //             projectId: 1,
    //             categoryId: 1,
    //             remarks: 'zzz'
    //         }
    //         ])
    //    },
    //    dataType: "json"
    // }).then(function() {
    // });

    // jQuery.ajax({
    //        type: "POST",
    //        url: 'http://123.207.94.56:3000/users/version_check',
    //        traditional:true,
    //        data:{
    //             sig: 'fed9a4cfd84605486dc79df5eedfa3e3',
    //             projectid: 1,
    //             list: JSON.stringify(['c.svg', 'd.svg'])
    //        },
    //        dataType: "json",
    //        async: false
    //     });

    jQuery.get('http://123.207.94.56:3000/users/downloadZip', { sig: 'f391a02a9b9f430678201a3e22ab1366', remark: '测试下载 zip 压缩包', id: JSON.stringify([1197, 1199]) }, function (data) {
        console.log(data);

    });

    // jQuery.ajax({
    //    type: "POST",
    //    url: 'http://127.0.0.1:3000/users/uploadHtml',
    //    traditional:true,
    //    dataType: "json",
    //    async:false
    // });
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
        // xhr.open("GET", "http://127.0.0.1:3000/getDetail?path=" + path);
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
