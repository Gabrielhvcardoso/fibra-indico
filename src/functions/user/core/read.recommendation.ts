import knex from '../../../database';

import { Recommendation } from '../../../types/recommendation';

export type UserReadRResponse = Array<Recommendation>

const read = async (token: string): Promise<UserReadRResponse> => {
  const response: Array<Recommendation> = await knex('recommendation').where({ fromUserToken: token });
  return response;
};

export default read;
