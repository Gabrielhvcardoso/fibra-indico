import knex from '../../../database';

import { Recommendation } from '../../../types/recommendation';
import { Response } from '../../../types/response';
import { WithdrawOrder } from '../../../types/withdrawOrder';

type UserHistoryResponse = Response & { history?: Array<Recommendation | WithdrawOrder> }

const history = async (token: string): Promise<UserHistoryResponse> => {
  try {
    const withdraws: Array<WithdrawOrder> = await knex('withdrawOrder').where({ fromUserToken: token });
    const recommendations: Array<Recommendation> = await knex('recommendation').where({ fromUserToken: token });

    const history = [...withdraws, ...recommendations].sort((a, b) => a.createdAt > b.createdAt ? 1 : -1);

    return ({
      code: 'success',
      history
    });
  } catch {
    return ({ code: 'error' });
  }
};

export default history;
