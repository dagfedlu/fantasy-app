import type { Player } from "./getPlayers"
export const getTeamPlayers = (rawPlayers: Player[]) => {
    const players = rawPlayers?.reduce(function(players: any, player: Player){
        if(player.teamName in players) {
            players[player.teamName]?.push(player)
        }
        else {
            players[player.teamName] = [player]
        }
        return players
    },{})
    return players
}