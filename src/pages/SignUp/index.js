import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd"
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import { useSnackbar } from "notistack";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Copyright from "../../components/Copyright";

import styles from "./styles";

import api from "../../services/api"

const SignInLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/" {...props} />
));

export default function SignUp(props) {
  const classes = styles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = event => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (firstName === "" || lastName === "" || email === "" || password === "" || cpf === "" || rg === "") {
      enqueueSnackbar("Verifique os campos", {
        variant: "error"
      });
      return;

    }
    const payload = {
      firstName,
      lastName,
      email,
      password,
      cpf,
      rg,
    }
    try {
      await api.post('/users', payload)

      props.history.push("/");

    } catch (error) {
      if (error.response.status === 400) {
        enqueueSnackbar(error.response.data.error, {
          variant: "error"
        });
      } else {

        enqueueSnackbar("Desculper, servidor não encontrado", {
          variant: "error"
        });
      }

    }

  }

  return (
    <>
      <CssBaseline/>
      <Container style={{display: "flex", justifyContent: "center", marginTop: "150px",width:"100%"}}>
        <Grid item xs={true} sm={2} md={4} component={Paper} elevation={6} square >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AssignmentIndIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastre-se
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="Name"
                  variant="outlined"
                  required
                  fullWidth
                  id="FirstName"
                  label="Nome Completo"
                  autoFocus
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <Button onClick={handleClickOpen}>Tipo Sanguineo</Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose} > 
        <DialogTitle>Selecione</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native" ></InputLabel>
              <Select
                native
                value={age}
                onChange={handleChange}
                input={<Input id="demo-dialog-native" />}
              >
                <option value="" />
                <option value={10}>O +       </option>
                <option value={20}>O -       </option>
                <option value={40}>A +       </option>
                <option value={50}>A -       </option>
                <option value={60}>B +       </option>
                <option value={70}>B -       </option>
                <option value={80}>AB +      </option>
                <option value={90}>AB -      </option>
               
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="cpf"
                  label="CPF"
                  name="cpf"
                  autoComplete="CPF"
                  value={lastName}
                  onChange={e => setCpf(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="rg"
                  label="RG"
                  name="rg"
                  autoComplete="RG"
                  value={lastName}
                  onChange={e => setRg(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Confirmar
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link component={SignInLink} variant="body2">
                 Já tem uma conta? Faça Login
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
      </Container>
      </>
  
  );
}

