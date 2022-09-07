import * as React from 'react';
import { useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems } from '../Components/listItems';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useLocation, useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'accuracy',
    headerName: 'accuracy',
    width: 150,
  },
  {
    field: 'prediction',
    headerName: 'Type',
    width: 150,
  },
  {
    field: 'comment',
    headerName: "Doctor's comment",
    width: 200,
  },
];

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [show, setShow] = React.useState(false);
  const [prediction, setPrediction] = React.useState(0)
  const [comment, setComment] = React.useState("")
  const [type, setType] = React.useState(0)
  const [predictions, setPredictions] = React.useState([])
  const toggleDrawer = () => {
    setOpen(!open);
  };

  let location = useLocation()
  let navigate = useNavigate()

  useEffect(() => {
    console.log(location)
    axios.post("http://127.0.0.1:8000/app/user/", { "email": location.state.email })
      .then(res => setPredictions(res.data.data))
  }, [])


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let formData = {
      "clump_thickness": data.get('clump'),
      "unif_cell_size": data.get('cell_size'),
      "unif_cell_shape": data.get('cell_shape'),
      "marg_adhesion": data.get('adh'),
      "single_epith_cell_size": data.get('epith'),
      "bare_nuclei": data.get('nucl'),
      "bland_chrom": data.get('chrom'),
      "norm_nucleoli": data.get('norm'),
      "mistoses": data.get('mist'),
      "email": location.state.email
    };

    axios.post("http://127.0.0.1:8000/app/predict/", formData).then(res => {
      setPrediction(res.data['accuracy'])
      setComment(res.data['message'])
      setType(res.data['prediction'])
      setShow(true)
    }).then(() => {
      axios.post("http://127.0.0.1:8000/app/user/", { "email": location.state.email })
        .then(res => setPredictions(res.data.data))
    })
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit" onClick={() => navigate('../', { replace: true })}>
              <ExitToAppIcon onC />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {/* {secondaryListItems} */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 400,
                  }}
                >
                  <h2>Predict</h2>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                  >
                    <TextField id="outlined-basic" label="Clump Thickness" name='clump' variant="outlined" />
                    <TextField id="outlined-basic" label="Unif Cell Size" name='cell_size' variant="outlined" />
                    <TextField id="outlined-basic" label="Unif Cell Shape" name='cell_shape' variant="outlined" />
                    <TextField id="outlined-basic" label="Marg Adhesion" name='adh' variant="outlined" />
                    <TextField id="outlined-basic" label="Single Epith Cell Size" name='epith' variant="outlined" />
                    <TextField id="outlined-basic" label="Bare Nuclei" name='nucl' variant="outlined" />
                    <TextField id="outlined-basic" label="Bland Chrom" name='chrom' variant="outlined" />
                    <TextField id="outlined-basic" label="Norm Nucleoli" name='norm' variant="outlined" />
                    <TextField id="outlined-basic" label="Mistoses" name='mist' variant="outlined" />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Predict
                    </Button>
                  </Box>

                  {/* <Chart /> */}
                </Paper>
                {/* Recent Deposits */}

                {/* Recent Orders */}
              </Grid>

              {
                show ? <Grid item xs={12} md={4} lg={3}>

                  {type == 2 ? <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                      backgroundColor: 'lightgreen'
                    }}
                  >
                    <h2>{comment}</h2>
                    <h3>The Accuracy Rate is: %{prediction}</h3>
                  </Paper> : <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                      backgroundColor: 'red'
                    }}
                  >
                    <h2>Unfortunately, It's Malignant !</h2>
                    <h3>The Accuracy Rate is: %{prediction}</h3>
                  </Paper>}

                </Grid> : <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                  </Paper>
                </Grid>
              }



              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                      rows={predictions}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      checkboxSelection
                      disableSelectionOnClick
                      experimentalFeatures={{ newEditingApi: true }}
                      components={{ Toolbar: GridToolbar }}
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
