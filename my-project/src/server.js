var http = require('http');
var formidable = require('formidable');
var fs = require('fs');


http.createServer(function (req, res) {
  console.log(req.url)
  if (req.url == '/fileupload') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('File uploaded and moved!');
    res.end();
  
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080); 