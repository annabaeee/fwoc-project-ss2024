# FWOC Project RATEIFY

This project is a movie rating web app. You can add your own ratings on a five star scale, edit them and remove them.
On the home page you can see the currently trending movies and tv shows, while on the movies and tv shows pages you can see the most popular movies and tv shows respectively.
The rated page is where you can see all of the ratings you have given.
There's also a search function that works by either pressing enter or pressing the search icon. The results will show all movies/tv shows containing the keywords you put in.
When you click on a movie or a tv show, a page containing some important information will be displayed.

The main change from concept to working app was the rating feature. We realized that in our original concept we didn't have any CRUD operations.
We also changed how the movies are displayed. In our original concept they were displayed by category on all pages, however it was a lot easier to just have one type of movies/shows (e.g. trending) displayed on a page.

1. Unzip the file
3. Go to https://www.themoviedb.org and create an account
4. Copy your API Read Access Token (NOT API Key!!!)
5. Create a .env file in the project folder and input the following:
    VITE_API_TOKEN=your_token_here
6. Save
7. Run npm install
8. Run npm run dev

Vercel link: https://fwoc-project-ss2024.vercel.app