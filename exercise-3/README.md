## Exercise 3 - Render data

For this exercise a sample dataset has been prepared for you in the file [searchSuggestions.tsx](/src/data/searchSuggestions.tsx). 

### A. Creating the endpoint

You can use the Next.js API folder to add an endpoint that returns the sample dataset. 
When you have done this correctly and your application is running then you can query the search endpoint. For example a user searching for search term `trui`:
```
curl -s http://localhost:3000/api/search?search=ca
```

If your application is not running, use the following command to start it:

```
npm run dev
```
### B. Returning the correct data

Write logic that shows the correct search suggestions based on the data from the above mentioned API. Search suggestions should be rendered according to the designs in excercise3.png. 

Pay attention to the following:

- Search suggestions are shown `onChange`;
- Data is retrieved from the API when the search query is longer than 2 characters;
- Data is filtered and shown based on user input
- Visibility of results list
- Matching search query should be highlighted in results;
- Unit tests for above scenario's (including a mock so that we don't go to the network in the test).