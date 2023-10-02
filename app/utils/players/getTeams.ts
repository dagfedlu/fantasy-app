export type Team = {
    id: number,
    name: string,
    shortName: string
    
}
export const getTeams = (allData: any, fixtures: any) => {
let teams: Team[] = []
  allData?.teams?.map((item: any) => {
    teams?.push({
      id: item?.id,
      name: item?.name,
      shortName: item?.short_name
    })
    return null
})
  return teams
}