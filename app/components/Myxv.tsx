// style
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

type Player = {
  Player_Name: string,
  Cost: number,
  Team: string,
  Position: string,
  Fixture_Difficulty: number,
  Against: string,
  Total_Points: number,
  Photo: string,
}

// check if fixture difficulty is acceptable
const check_difficulty = (value: number) => {
  return value <= 2
}
// classify by position
const is_keeper = (position: string) => {
  return position === "Goalkeeper"
}
const is_defender = (position: string) => {
  return position === "Defender"
}
const is_midfielder = (position: string) => {
  return position === "Midfielder"
}
const is_forward = (position: string) => {
  return position === "Forward"
}

export default function Myxv({players}) {
  let bestXV: Player[] = [] 
  let best_keepers: Player[] = []
  let best_defenders: Player[] = []
  let best_midfielders: Player[] = []
  let best_forwards: Player[] = []
  // create an array of 
  // keepers - amount = 2
  players?.filter(player => check_difficulty(player?.nextFixture?.difficulty)).sort((first, second) => second?.points - first?.points).filter(player => is_keeper(player?.position)).slice(0,2)
  .map((player: any) => {
    best_keepers?.push({
      Player_Name: player?.webName,
      Cost: player?.cost,
      Team: player?.teamName,
      Position: player?.position,
      Fixture_Difficulty: player?.nextFixture?.difficulty,
      Against: player?.nextFixture?.opponent,
      Total_Points: player?.points,
      Photo: player?.photo.split('.'),
    })
  })
  // defenders - amount = 5
  players?.filter(player => check_difficulty(player?.nextFixture?.difficulty)).sort((first, second) => second?.points - first?.points).filter(player => is_defender(player?.position)).slice(0,5)
  .map((player: any) => {
    best_defenders?.push({
      Player_Name: player?.webName,
      Cost: player?.cost,
      Team: player?.teamName,
      Position: player?.position,
      Fixture_Difficulty: player?.nextFixture?.difficulty,
      Against: player?.nextFixture?.opponent,
      Total_Points: player?.points,
      Photo: player?.photo.split('.'),
    })
  })
  // midfielders - amount = 5
  players?.filter(player => check_difficulty(player?.nextFixture?.difficulty)).sort((first, second) => second?.points - first?.points).filter(player => is_midfielder(player?.position)).slice(0,5)
  .map((player: any) => {
    best_midfielders?.push({
      Player_Name: player?.webName,
      Cost: player?.cost,
      Team: player?.teamName,
      Position: player?.position,
      Fixture_Difficulty: player?.nextFixture?.difficulty,
      Against: player?.nextFixture?.opponent,
      Total_Points: player?.points,
      Photo: player?.photo.split('.'),
    })
  })
  // fowards - amount = 3
  players?.filter(player => check_difficulty(player?.nextFixture?.difficulty)).sort((first, second) => second?.points - first?.points).filter(player => is_forward(player?.position)).slice(0,3)
  .map((player: any) => {
    best_forwards?.push({
      Player_Name: player?.webName,
      Cost: player?.cost,
      Team: player?.teamName,
      Position: player?.position,
      Fixture_Difficulty: player?.nextFixture?.difficulty,
      Against: player?.nextFixture?.opponent,
      Total_Points: player?.points,
      Photo: player?.photo.split('.'),
    })
  })

  bestXV = [...best_keepers, ...best_defenders, ...best_midfielders, ...best_forwards] // iterate through bestXV for card items
  
  console.log(bestXV);
  
  return (
    <Grid container spacing={4}>
      {bestXV.map((player, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Card
             sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <CardMedia
              component="div"
              sx={{
                // 16:9
                pt: '98.25%',
              }}
              image={`https://resources.premierleague.com/premierleague/photos/players/250x250/p`+ player?.Photo[0] + `.png`}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2" align="center">
                {player?.Player_Name+` (`+player?.Cost+`)`}
              </Typography>
              <Typography component="h6" align="center">
                {player?.Position}
              </Typography>
              <Typography component="h5" sx={{backgroundColor: "lightgreen"}} align="center">
                {player?.Against}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}