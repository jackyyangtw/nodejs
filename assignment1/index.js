const http = require("http");
const server = http.createServer((req, res) => {
  const { url, method } = req;
  if (url === "/") {
    const html = `
        <html>
            <head><title>Main Page</title><head>
            <body>
                <h1>Hello world</h1>
            </body>
            <h1>Create User</h1>
            <form action="/create-user" method="POST">
                <input type="text" name="username">
                <button type="submit">Submit</button>
            </form>
        </html>
    `;
    res.setHeader("Content-Type", "text/html");
    res.write(html);
    return res.end()
  }
  if (url === "/users") {
    const html = `
        <html>
            <head><title>User List</title><head>
            <body>
                <h1>User page</h1>
                <ul>
                    <li>User 1</li>
                    <li>User 2</li>
                    <li>User 3</li>
                    <li>User 4</li>
                </ul>
            </body>
        </html>
    `;
    res.setHeader("Content-Type", "text/html");
    res.write(html);
  }
  if(url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data',(chunk)=> {
      body.push(chunk)
    });
    req.on('end',()=> {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split('=')[1];
      console.log(username);
    })
    res.statusCode = 302;
    res.setHeader('Location','/');
    res.end()
  }
});
server.listen(1000);
