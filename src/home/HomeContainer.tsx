import React from "react";
import "./home.css";
import { IMovie, IMovieAggregate } from "../common/types/IMovie";
import BoxOfficeService from "../services/BoxOfficeService";
import IMovieDetails from "../common/types/IMovieDetails";
import MovieList from "../Movies/MovieList";
import NavBar from "../Component/navbar/NavBar";
import Spinner from "../Component/UI/Spinner";
import NoData from "../Component/NoData/NoData";
import { Container } from "@material-ui/core";

interface IState {
  movies: IMovieAggregate[] | undefined;
  filmWorldMovieDetails: IMovieDetails | undefined;
  cinemaWorldMovieDetails: IMovieDetails | undefined;
  loader: Boolean | undefined;
  error: Boolean | undefined;
}

class HomeContainer extends React.Component {
  readonly state: Readonly<IState> = {
    movies: undefined,
    filmWorldMovieDetails: undefined,
    cinemaWorldMovieDetails: undefined,
    loader: false,
    error: false,
  };

  private _isMounted = false;

  async componentDidMount() {
    this._isMounted = true;

    await this.loadMovies();
  
  }

  handleFilmWorld = (result: IMovie[]) => {
    localStorage.setItem("movieListFilmWorld", JSON.stringify(result));
  };

  handleCinemaWorld = (result: IMovie[]) => {
    localStorage.setItem("movieListCinemaWorld", JSON.stringify(result));
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

   async loadMovies() {
    try {
      this.updateState({ loader: true });
      if (
        localStorage.getItem("movieListFilmWorld") === null ||
        localStorage.getItem("movieListCinemaWorld") === null 
      ) {
       const [FWMovies,CWMovies] = await Promise.all([
          BoxOfficeService.getMovies("filmworld"),
          BoxOfficeService.getMovies("cinemaworld")
        ]);
        localStorage.setItem("movieListFilmWorld", JSON.stringify(FWMovies));
        localStorage.setItem("movieListCinemaWorld", JSON.stringify(CWMovies));
        
      }
      
      this.PopulateMovieList();
      this.updateState({ loader: false, error: false });

    } catch (e) {
      this.updateState({ loader: false, error: true });
      await this.loadMovies();
    }    
  }

  onSelectMovie = async (movie: IMovieAggregate) => {
    try {
      this.updateState({
        filmWorldMovieDetails: undefined,
         cinemaWorldMovieDetails:  undefined        
       }); 

      const filmWorldMovieResquest =  BoxOfficeService.getMovieById(
        "filmworld",
        movie.FilmWorldID
      );
      const cinemaWorldRequest =  BoxOfficeService.getMovieById(
        "cinemaworld",
        movie.CinemaWorldID
      );

      const[ filmWorld,cinemaWorld] = await Promise.allSettled([filmWorldMovieResquest, cinemaWorldRequest]);

  
      this.updateState({
        filmWorldMovieDetails: filmWorld.status === "fulfilled" ? filmWorld.value : undefined,
         cinemaWorldMovieDetails: cinemaWorld.status === "fulfilled" ? cinemaWorld.value : undefined        
       }); 

    } catch (e) {
      this.updateState({ loader: false });
    }
  };

  private PopulateMovieList() {
   
    var movieListFilmWorld = localStorage.getItem("movieListFilmWorld") != null
      ? JSON.parse(localStorage?.getItem("movieListFilmWorld") ?? "")
      : "";

    var movieListCinemaWorld = localStorage.getItem("movieListCinemaWorld") != null
      ? JSON.parse(localStorage?.getItem("movieListCinemaWorld") ?? "")
      : "";

    let movieList: IMovieAggregate[] = [];

    var movies = movieListFilmWorld.Movies?? movieListCinemaWorld.Movies;

    for (let movie of movies) {
      let movieAggregate: IMovieAggregate = {
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
        FilmWorldID: movie.ID,
        CinemaWorldID: movieListCinemaWorld.Movies.find((c: IMovie) => c.Title === movie.Title).ID,
        Type: movie.Type,
      };

      movieList.push(movieAggregate);
    }

    this.updateState({ movies: movieList });
  }

  updateState(updatedState: Partial<IState>) {
    if (this._isMounted) {
      this.setState(updatedState);
    }
  }

  render() {
    const {
      movies,
      filmWorldMovieDetails,
      cinemaWorldMovieDetails,
    } = this.state;

    return (
      <div>
        <NavBar />
        {this.state.loader ? <Spinner /> : ""}
        {movies != null ? (
          <MovieList
            movies={movies}
            filmWorldMovieDetails={filmWorldMovieDetails}
            cinemaWorldMovieDetails={cinemaWorldMovieDetails}
            onSelectMovie={this.onSelectMovie}
          />
        ) : (
          ""
        )}

        {!this.state.loader && this.state.error ? (
          <Container>
            <NoData />
          </Container>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default HomeContainer;
