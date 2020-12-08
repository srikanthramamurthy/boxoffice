import React from "react";
import {
  withStyles,
  WithStyles,
  Button,
} from "@material-ui/core";
import styles from "./MovieSummary.styles";
import IMovieDetails from "../common/types/IMovieDetails";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Close from '@material-ui/icons/Close';
import Spinner from "../Component/UI/Spinner";

interface IProps extends WithStyles<typeof styles> {
  filmWorldMovieDetails: IMovieDetails | undefined;
  cinemaWorldMovieDetails: IMovieDetails | undefined;
  onClosePopup: () => void;
}


class MovieSummary extends React.Component<IProps> {

  render() {
    const {
      filmWorldMovieDetails,
      cinemaWorldMovieDetails,
      onClosePopup,
      classes
    } = this.props;

    var movieDetails = filmWorldMovieDetails??cinemaWorldMovieDetails;
    var isFWCheaper = filmWorldMovieDetails != undefined && cinemaWorldMovieDetails != undefined && filmWorldMovieDetails.Price < cinemaWorldMovieDetails.Price;

    return (
      <div className="overlay">
         {movieDetails == undefined ? <Spinner /> : ""}
         {movieDetails != undefined ?
        <div className="summaryPanel">
      
        <Card>
      <CardHeader       
        action={
          <IconButton  onClick={onClosePopup}>
            <Close />
          </IconButton>
        }
        title={movieDetails?.Title}
        subheader= {movieDetails?.Year}
      />
    
      <CardContent>
      <div className={classes.tiles} title ='Country'>{movieDetails?.Country}</div>
      <div className={classes.tiles} title ='Language'>{movieDetails?.Language}</div>
      <div className={classes.tiles} title ='Rating'>{movieDetails?.Rating}</div>
      <br/>
      <br/>
      <div className={classes.clear}> </div>
      <div>
       Film World: <span className={(filmWorldMovieDetails == undefined || filmWorldMovieDetails?.Price == cinemaWorldMovieDetails?.Price)  ? classes.NA :+(filmWorldMovieDetails?.Price ?? 99999) > +(cinemaWorldMovieDetails?.Price ?? '99999') ? classes.expensive : classes.cheaper}>
        {filmWorldMovieDetails?.Price != null ? `$ ${filmWorldMovieDetails?.Price}` : "Not Available"}
        </span>
        <br/>
       Cinema World: <span className={(cinemaWorldMovieDetails == undefined || filmWorldMovieDetails?.Price == cinemaWorldMovieDetails?.Price) ? classes.NA :+(filmWorldMovieDetails?.Price ?? 99999) < +(cinemaWorldMovieDetails?.Price ?? '99999') ? classes.expensive : classes.cheaper}>
        {cinemaWorldMovieDetails?.Price != null ? `$ ${cinemaWorldMovieDetails?.Price}` : "Not Available"}
        </span>
        </div>
        <br/>
          <Typography paragraph>Plot:</Typography>
          <Typography paragraph>
          {filmWorldMovieDetails?.Plot}
          </Typography>
        </CardContent>
     
    </Card>
        </div>
      :""}
      </div>
    );
  }
}

export default withStyles(styles)(MovieSummary);
