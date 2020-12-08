import React from "react";
import {
  withStyles,
  WithStyles,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Container,
  TableContainer,
  Paper,
} from "@material-ui/core";
import { lighten, makeStyles } from "@material-ui/core/styles";
import styles from "./MovieList.styles";
import { IMovieAggregate as IMovieAggregate, IMovie } from "../common/types/IMovie";
import IMovieDetails from "../common/types/IMovieDetails";
import MovieListStyles from "./MovieList.styles";
import MovieSummary from "./MovieSummary";

interface IState {
  showPopup: boolean;
}

interface IProps extends WithStyles<typeof styles> {
  movies: IMovieAggregate[];
  filmWorldMovieDetails: IMovieDetails | undefined;
  cinemaWorldMovieDetails: IMovieDetails | undefined;
  onSelectMovie: (movie: IMovieAggregate) => Promise<void>;
}

class MovieList extends React.Component<IProps, IState> {
  readonly state: Readonly<IState> = { showPopup: false };

  private handleSelectMovie = async (movie: IMovieAggregate) => {
    this.showPopup();
    await this.props.onSelectMovie(movie);
    
  };

  showPopup() {
    this.setState({ showPopup: true });
  }

  closePopup = () => {
    this.setState({ showPopup: false });
  };

  render() {
    const {
      movies,
      filmWorldMovieDetails,
      cinemaWorldMovieDetails,
      classes,
    } = this.props;

    return (
      <div>
        <Container>
          <TableContainer component={Paper}>
            <Table
              className={classes.summaryTable}
              size="small"
              aria-label="Voyage availability summary"
              stickyHeader
            >
              <TableHead className={classes.head}>
                <TableRow className={classes.head}>
                  <TableCell>Movie Title</TableCell>
                  <TableCell>Year</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movies?.map((movie, index) => {
                  return (
                    <React.Fragment key={index}>
                      <TableRow
                        hover
                        className={classes.menuRow}
                        style={
                          index % 2
                            ? { background: "rgba(0, 0, 0, 0.04)" }
                            : { background: "white" }
                        }
                        onClick={() => {
                          this.handleSelectMovie(movie);
                        }}
                      >
                        <TableCell>
                          <div>{movie.Title}</div>
                        </TableCell>
                        <TableCell>
                          <div>{movie.Year}</div>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
        {this.state.showPopup ? (
          <MovieSummary
            filmWorldMovieDetails={filmWorldMovieDetails}
            cinemaWorldMovieDetails={cinemaWorldMovieDetails}
            onClosePopup={this.closePopup}
          />
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(MovieList);
