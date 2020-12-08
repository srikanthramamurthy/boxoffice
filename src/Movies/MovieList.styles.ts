import { createStyles } from '@material-ui/core/styles';

export default createStyles({
  head:{
    backgroundColor: "black",
    color: "white",
    textAlign: "center"
  },
  summaryTable: {
    minWidth: 650,
    whiteSpace: 'pre',
   
  },
  inputField: {
    width: '200px'
  },
  header: {
    marginBottom: '20px',
    backgroundColor:"#64b5f6 !important"
  },
  menuRow:{
paddingLeft:2,
paddingRight:1,
height: 55,
  "&:hover": {
    backgroundColor: "#e3f2fd !important" 
}
 },
  

 tableHead:{
    backgroundColor:"#64b5f6 !important"
  },
 
});
