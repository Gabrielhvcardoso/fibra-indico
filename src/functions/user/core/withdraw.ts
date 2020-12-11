import knex from '../../../database';
import { Response } from '../../../types/response';

export type UserWithdrawResponse = Response & { withdrawId?: number };

const withdraw = async (token: string, amount: number): Promise<UserWithdrawResponse> => {
  const response: Array<number> = await knex('withdrawOrder')
    .insert({
      fromUserToken: token,
      amount,
      status: 'pending',
      createdAt: new Date().getTime().toString()
    });

  if (!response[0]) {
    return ({ code: 'error' });
  }

  return ({
    code: 'success',
    withdrawId: response[0]
  });
};

export default withdraw;
