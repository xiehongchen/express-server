# 导出
> 111
> 
> 111
```js
expHandler () {
  // 导出消息提示
  const loading = this.$loading({
    lock: true,
    text: '正在导出',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  // 导出状态，是否为加载中
  this.expLoading = true
  // 获取请求参数
  let params = JSON.parse(JSON.stringify(this.formData))
  if (params.time && params.time.length > 0) {
    params.startTime = params.time[0]
    params.endTime = params.time[1]
  }
  params.success = this.archiveStatus
  if (params.success === 0) params.success = ''
  if (!params.key) delete params.key
  if (!params.schoolId) delete params.schoolId
  if (!params.timePlatform) delete params.timePlatform
  delete params.time
  delete params.page
  // 发送请求
  this.$axios({
    // 请求方法为post
    method: 'post',
    // 请求头为application/octet-stream,二进制流，不知道下载文件类型
    header: { 'Content-Type': 'application/octet-stream' },
    // 响应类型为blob，二进制大对象，用于存储二进制数据
    responseType: 'blob',
    url: '/admin/system/api/exportArchiveLog',
    data: { ...params }
  }).then(res => {
    // 获取响应头中的content-disposition，获取文件名
    const disposition = res.headers['content-disposition']
    const disArr = disposition ? disposition.split(';') : []
    let fileName = ''
    for (let i = 0, len = disArr.length; i < len; i++) {
      if (disArr[i].indexOf('filename=') > -1) {
        fileName = decodeURIComponent(disArr[i].split('=')[1])
      }
    }
    // 创建a标签，设置href为blob对象地址，设置download为文件名
    const blob = new Blob([res.data], { type: 'application/octet-stream' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName ? fileName.replace(/"/g, '') : fileName
    // 模拟点击a标签，下载文件
    document.body.appendChild(link)
    link.click()
    // 删除a标签，释放内存
    document.body.removeChild(link)
    window.URL.revokeObjectURL(link.href)
    // 关闭导出提示
    loading.close()
    this.expLoading = false
    this.$message.success('已成功导出，留意浏览器下载内容')
  }).catch(() => {
    loading.close()
    this.expLoading = false
  })
},
```



1. 获取请求数据数据
2. 发送请求，方法为post，header为application/octet-stream，responseType为blob
   - application/octet-stream：二进制流，不知道下载文件类型
   - blob：二进制大对象，用于存储二进制数据
3. 通过响应头中的content-disposition，获取文件名 数据为attachment;filename=archiveLog.xlsx
4. 获取文件名 archiveLog.xlsx
5. 使用blob对象存储数据 `const blob = new Blob([res.data], { type: 'application/octet-stream' })` 意思是这个blob对象存储的是二进制流数据
   - 格式为 `const blob = new Blob([数据], { type: '文件类型' })`
6. 创建一个a标签，然后这个a标签的href属性为blob对象的url，download属性为文件名
7. 生成a标签后，模拟点击a标签，下载文件
8. 然后删除a标签，释放内存
```html
<!DOCTYPE html>
<html>

<head>
  <title>Large File Upload</title>
  <style>
    div {
      height: 300px;
    }
  </style>
</head>

<body>
  <input type="file" id="file-input" />
  <button id="upload-btn">Upload</button>
  <button id="one">一次</button>
  <div id="upload-status"></div>

  <script>
    let chunkIndex = 0;
    document.getElementById('upload-btn').addEventListener('click', function () {
      const fileInput = document.getElementById('file-input');
      const file = fileInput.files[0];
      console.log('file', file)

      if (!file) {
        return;
      }
      const chunkSize = 1024 * 1024; // 1MB
      const maxConcurrentRequests = 5; // 最大并发请求数量
      let offset = 0;
      let activeRequests = 0;
      const totalChunks = Math.ceil(file.size / chunkSize);
      const originalFilename = file.name;


      function uploadChunk() {
        console.log('chunkIndex', chunkIndex)
        if (activeRequests >= maxConcurrentRequests) {
          return; // 达到最大并发请求数量，暂停发送新请求
        }

        // 块
        const chunk = file.slice(offset, offset + chunkSize);
        // const id = Symbol()
        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('chunkIndex', chunkIndex);
        formData.append('totalChunks', totalChunks);
        formData.append('originalFilename', originalFilename);
        // formData.append('id', id)

        fetch('http://localhost:3000/uploads/merge', {
          method: 'POST',
          body: formData
        }).then(response => {
          chunkIndex++;
          // console.log('chunkIndex', chunkIndex)

          activeRequests--;
          if (response.ok) {
            offset += chunkSize;

            if (offset < file.size) {
              uploadChunk();
            } else {
              document.getElementById('upload-status').innerText = 'File uploaded!';
            }
          } else {
            throw new Error('Upload failed: ' + response.status + ' ' + response.statusText);
          }
        }).catch(error => {
          console.log(error);
          console.log('111')
          return Promise.reject(error);
        });
      }
      function processUpload() {
        while (offset < file.size && activeRequests < maxConcurrentRequests) {
          uploadChunk();
          activeRequests++;
        }
      }

      processUpload();
    });
  </script>
</body>

</html>
```