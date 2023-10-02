import { getTeams } from "../players/getTeams"
export type Fixture = {
    id: number,
    awayTeam: string,
    homeTeam: string,
    homeTeamDifficulty: number
    awayTeamDifficulty: number
    homeTeamScore: number
    awayTeamScore: number
    gameWeek: number
}
export const getFixtures = (allData: any, fixturesData: any) => {
    const teams = getTeams(allData, fixturesData)
    let fixtures: Fixture[] = []
        fixturesData?.map((item: any) => {
          fixtures?.push({
            id: item?.id,
            awayTeam: teams?.filter((elt) => elt.id === item?.team_a)[0].name,
            homeTeam: teams?.filter((elt) => elt.id === item?.team_h)[0].name,
            homeTeamDifficulty: item?.team_h_difficulty,
            awayTeamDifficulty:  item?.team_a_difficulty,
            homeTeamScore:item?.team_h_score,
            awayTeamScore:item?.team_a_score,
            gameWeek: item?.event
          })
          return null
        })
        return fixtures
}