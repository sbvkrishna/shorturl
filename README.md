# URL Shortener API


### How it works

1. POST a URL to `[project_url]/api/shorturl/new` and receive a shortened URL in the JSON response. Example : `{"original_url":"www.google.com","short_url":1}`
2. If you pass an invalid URL that doesn't follow the valid `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like `{"error":"invalid URL"}`.
3. On visiting the shortened URL, it will redirect to the original link.


