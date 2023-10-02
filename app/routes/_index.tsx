import type { ActionFunction, LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import authenticator from "~/services/auth.server";
import Myxv from "~/components/Myxv";
// data
import { getData } from "~/services/allApi/allData";
import { getAllFixtures } from "~/services/fixtures/getAllFixtures";
// methods
// import { getTeams } from "~/utils/players/getTeams";
// import { getPositions } from "~/utils/players/getPositions";
import { getPlayers } from "~/utils/players/getPlayers";
// import { getTeamPlayers } from "~/utils/players/getTeamPlayers";
// import { getFixtures } from "~/utils/fixtures/getFixtures";
// import { getTeamFixtures } from "~/utils/players/getTeamFixtures";
// --------- style
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Paper from "@mui/material/Paper";


export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export let loader: LoaderFunction = async ({ request }) => {
  const auth = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login"
  });
  const allData = await getData()
  const fixtures = await getAllFixtures()
  return {allData, fixtures, auth}
};
// logout - when button is pressed
export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, {redirectTo: "/login"})
}

export default function Index() {
  const {allData,fixtures, auth} = useLoaderData()
// const teams = getTeams(allData, fixtures)
// console.log({teams})

// const positions = getPositions(allData)
// console.log({positions})
const players = getPlayers(allData, fixtures)
// console.log({players})

// const teamPlayers = getTeamPlayers(players)
// console.log({teamPlayers})
// console.log(teams, Object.keys(teamPlayers))

// const fixturesData = getFixtures(allData,fixtures)
// console.log(GW1Fixture);
// idea : create a state value to choose GW


// const teamFixtures = getTeamFixtures(allData, fixtures)
// console.log({teamFixtures})
// console.log("Arsenal Players", teamPlayers['Arsenal'])
  
  return (
    <>
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <SportsSoccerIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fantasy App Helper v1.0.0
          </Typography>
            <Form method="post">
              <Button type="submit" sx={{ color: "white" }}>Sign Out</Button>
            </Form>
        </Toolbar>
      </AppBar>
    </Box>
    {/* here we would display some static content */}
    <main>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
        <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Fantasy App
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph>
              Ready to begin. Select any player you prefer without the hassle of
              browsing through scout reports or websites. The players suggested below consist of 15 players and are expected to perform.
            </Typography>
            {/* carousel */}
            <div style={{display:"flex", justifyContent:"center"}}>
              {items.map((item, i) => <Item key={i} item={item} />)}
            </div>
        </Container>
      </Box>
      {/* component */}
      <Container sx={{ py: 8 }} maxWidth="md">
        <Myxv players={players} />
      </Container>
    </main>
    </>
    // <>
    // <h1>this is the index route</h1>
    // <h2>congrats on authenticating <span>...{auth?.username}</span></h2>
    // <Form method="post">
    //   <button>Log Out</button>
    // </Form>
    // <div>
    //   <h2>Welcome to Fantasy App Helper</h2>
    //   <h3>Here you can preview the most promosing 15 man squad that guarantees to deliver
    //     for your next gameweek. 
    //   </h3>
    // </div>
    // <div>
    //   <Myxv players={players} />
    // </div>
    // </>
  );
}

// carousel items - including description and images
var items = [
  {
    description: "Build your fantasy football team.",
    image: "/images/main-bg.jpg"
  },
  {
    description: "Select any player to form a squad without the headaches",
    image: "/images/players-bg.jpg"
  },
  {
    description: "Check the price and place him in your squad.",
    image: "/images/teams1-bg.jpg"
  }
]
// item component
function Item(props) {
  return (
    <Paper elevation={10} style={{margin:10}}>
      <img src={props.item.image} style={{maxWidth: 300, height:"auto"}}/>
      <p style={{padding:10}}>{props.item.description}</p>
    </Paper>
  )
}
