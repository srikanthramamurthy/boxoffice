import { createStyles } from '@material-ui/core/styles';

export default createStyles({

  inputField: {
    width: '200px'
  },
  header: {
    marginBottom: '20px'
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto'
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  clear:{
    clear: 'both'
   },
  tiles:{
   backgroundColor: '#f4f4f4',
   borderRadius: '.0625rem',
   color: '#6d6e73',
   display: 'inline-block',
   fontWeight: 500,
   letterSpacing: '0',
   lineHeight: 1,
   margin:  '0 .25rem .25rem 0',
   padding: '.1875rem .4375rem .125rem',
   float: 'left'
  },
  cheaper:{
    backgroundColor: "rgb(234, 242, 240)",
    color: "rgb(60, 110, 92)"
  },
  expensive: {
    backgroundColor: "rgb(237, 229, 202)",
    color: "rgb(116, 100, 8)"
  },
  NA:
  {
    backgroundColor: "#F0f0f0",
    color: "rgba(0, 0, 0, 0.87)"
  }
});
