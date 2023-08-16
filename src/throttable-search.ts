import http from 'http';
import fs from 'fs';
import url from 'url';

const posts = fs.readFileSync('src/assets/posts.json', {
  encoding: 'utf8',
  flag: 'r',
});

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/') {
    res.writeHead(200, { 'content-type': 'text/html' });
    fs.createReadStream('src/assets/throttable-search.html').pipe(res);
  } else if (parsedUrl.pathname === '/api/posts') {
    const search = parsedUrl.query.search || '';
    const parsedPosts = JSON.parse(posts);
    const filteredPosts = parsedPosts.filter((post) =>
      post.title.includes(search)
    );
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(filteredPosts));
  }
});

server.listen(process.env.PORT || 3000);

console.log('Visit http://localhost:3000');
