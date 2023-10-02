import {getAll} from '~/controllers/getBootstrap'
export const getData = async () => {
  const data = (await getAll()) as any;
  return data?.data;
};
