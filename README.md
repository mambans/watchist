# Watchist

Small application to save movies and series to a list with auto fetching details from [OMDB api](http://www.omdbapi.com/).
With features such as order by dragging, sorting by alphabet, year, ratings, runtime, boxoffice and total seasons.
All data is stored on both AWS and localstorage including the details to minimize unnessesary requests to [OMDB api](http://www.omdbapi.com/) (1000/daily limit).

There are two list for movies and series with following details:

## Movies details

- Title
- Poster
- Genre
- Plot
- Actors
- Awards
- Ratings
  - IMDB
  - Rotten Tomatoes
  - Metacritic
- Boxoffice

## Serie details

- Title
- Poster
- Genre
- Plot
- Actors
- Awards
- Ratings
  - IMDB
- Total seasons
