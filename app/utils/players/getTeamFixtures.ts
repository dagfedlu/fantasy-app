import { getFixtures } from "../fixtures/getFixtures"
import type { Fixture } from "../fixtures/getFixtures"
export type Team = {
    id: number,
    name: string,
    shortName: string
    fixtures: {
      opponent: string
      difficulty: number
      gameWeek: number
    }[]
}
export const getTeamFixtures = (allData: any, fixtures: any) => {
  const fixtureData = getFixtures(allData, fixtures)
  let teams: Team[] = []
  allData?.teams?.map((item: any) => {

    let teamFixtures: Fixture[] = fixtureData?.filter((elt) => elt?.awayTeam === item?.name || elt?.homeTeam === item?.name) 

    let temp : {
        opponent: string
        difficulty: number
        gameWeek: number
      }[] = []

      
     teamFixtures?.map((elt: any) => {
        temp?.push({
           opponent: item?.name === elt?.homeTeam ? elt?.awayTeam : elt?.homeTeam,
           difficulty: item?.name === elt?.homeTeam ? elt?.homeTeamDifficulty : elt?.awayTeamDifficulty,
           gameWeek: elt?.gameWeek
        })
    })

    teams?.push({
      id: item?.id,
      name: item?.name,
      shortName: item?.short_name,
      fixtures: temp
    })
    return null
})
  return teams
}