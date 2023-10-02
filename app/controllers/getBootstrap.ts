import axios from "axios";

export const getAll = async () => {
  try {
    const allData = await axios.get(
      "https://fantasy.premierleague.com/api/bootstrap-static/"
    );
    return allData;
  } catch (e) {
    return e;
  }
};
