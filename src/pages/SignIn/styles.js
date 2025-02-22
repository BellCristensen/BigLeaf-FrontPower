import { makeStyles } from "@material-ui/core/styles";
import LoginBackgroundImage from "../../assets/login-background.jpg";

const styles = makeStyles(theme => ({

  
  container: {
    display: "flex", 
    justifyContent: "center", 
    marginTop: "150px"
  },


  

 root: {
    margin: "0",
    padding: "0",
    height: "1000vh",
    alignItems: "center",
    justifyContent:"row-reverse",
    flexDirection: "continer",
    backgroundPosition: "center", 
  },
  image: {
    backgroundImage: `url(${LoginBackgroundImage})`,
    //backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    
   
  },
  avatar: {
    
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
   
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    
    margin: theme.spacing(3, 0, 2)
  }
}));

export default styles;
