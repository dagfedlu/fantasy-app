import {getFixtures} from '~/controllers/getFixtures'
export const getAllFixtures = async () => {
  const data = (await getFixtures()) as any;
  return data?.data;
};
