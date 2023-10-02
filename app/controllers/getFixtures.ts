import axios from "axios";

export const getFixtures = async () => {
  try {
    const fixtureData = await axios.get(
      "https://fantasy.premierleague.com/api/fixtures?future=1"
    );
    console.log({fixtureData})
    return fixtureData;
  } catch (e) {
    console.log(111111,e)
    return e;
  }
};