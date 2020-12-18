import knex from '../../../database';

import { WithdrawOrder } from '../../../types/withdrawOrder';

export type UserReadWResponse = Array<WithdrawOrder>

const read = async (token: string): Promise<UserReadWResponse> => {
  const response: Array<WithdrawOrder> = await knex('recommendation').where({ fromUserToken: token });
  return response;
};

export default read;
