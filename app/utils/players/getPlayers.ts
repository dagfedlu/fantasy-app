import { getTeamFixtures } from "./getTeamFixtures"
import { getPositions } from "./getPositions"

export type Player = {
  id: number,
  firstName: string,
  lastName: string,
  webName: string,
  points: number,
  form: string,
  photo: string,
  cost: number,
  teamName: string,
  position: string
  fixtures: {
    opponent: string
    difficulty: number
    gameWeek: number
  }[]
  nextFixture: {
    opponent: string
    difficulty: number
    gameWeek: number
  }
}


export const getPlayers = (allData: any, fixtures: any) => {
    const teams = getTeamFixtures(allData, fixtures)
    const positions = getPositions(allData)
  let players: Player[] = []
        allData?.elements?.map((item: any) => {
          players?.push({
            id: item?.id,
            firstName: item?.first_name,
            lastName: item?.second_name,
            webName: item?.web_name,
            points: item?.total_points,
            form: item?.form, 
            photo: item?.photo,
            cost: item?.now_cost/10,
            teamName: teams?.filter((elt) => elt.id === item?.team)[0].name,
            position: positions?.filter((elt) => elt.id === item?.element_type)[0].name,
            fixtures: teams?.filter((elt) => elt.id === item?.team)[0].fixtures,
            nextFixture: teams?.filter((elt) => elt.id === item?.team)[0].fixtures[0]
          })
          return null
        })
        return players
}