import knex from '../../../database';

import { Response } from '../../../types/response';
import { User } from '../../../types/user';
import { WithdrawOrder } from '../../../types/withdrawOrder';

const status = async (withdrawOrderId: number, status: string): Promise<Response> => {
  try {
    if (status === 'done') {
      const withdraw: WithdrawOrder = (await knex('withdrawOrder').where({ withdrawOrderId }))[0];
      const user: User = (await knex('user').where({ token: withdraw.fromUserToken }))[0];
      const nextAccount = user.account - withdraw.amount;
      await knex('withdrawOrder').where({ withdrawOrderId }).update({ status });
      await knex('user').where({ token: user.token }).update({ account: nextAccount });
      return ({ code: 'success' });
    } else {
      await knex('withdrawOrder').where({ withdrawOrderId }).update({ status });
      return ({ code: 'success' });
    }
  } catch (e) {
    console.log(e);
    return ({ code: 'error' });
  }
};

export default status;
