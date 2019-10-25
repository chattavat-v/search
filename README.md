search

npm install --save 

route api -> search 

full text search -> http://localhost:5000/api/blog/search/text?text=electronics

search data by option -> http://localhost:5000/api/blog/search/option?name=J&body=ess

search data with select option with mode true/false

true - (with option) -> http://localhost:5000/api/blog/search?mode=true&name=J&body=&text=doyle

false - (with full text) => http://localhost:5000/api/blog/search?mode=false&name=J&body=&text=doyle