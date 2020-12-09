# Movie BoxOffice

This is a Boxoffice aggregator application, which brings you the latest movies with cheapest prices amongst the listed websites

https://srikanthramamurthy.github.io/boxoffice/

## Assumptions

### Movie listing doesn't change during the session

* it is assumed that during the user session, movie list doesn't change. hence we are caching the movie list, once received from the server, due to the unreliable nature of the API
- alternative step would have been to reach API each time and use local storage only when API fails and replish the local storage

### Movie listing is same across both the websites

* it is assumed that the list of movies is same in both the website to simplify the aggreagation process. 
- alternative step would have been to loop through both the site's response and forming a list

### Movie prices vary each time

* it is assumed that movie prices vary each time, hence we are not caching the prices. instead we are showing "Not Available" when a particular site fails to respond.

## Can be improved

* On API failure, recursive call has been made to avoid users to try again
- alternatively, its a better option to show a message to users to try again instead of recursive tryig, which would have other side effects
- or add a bit more intelligence around retrying failed api calls

* Due to incompatibity of latest react and enzyme libraries, I have used html comparisions instead of a cleaner checks
