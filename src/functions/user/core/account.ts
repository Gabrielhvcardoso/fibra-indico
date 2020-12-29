import knex from '../../../database';
import { Account, isAccount } from '../../../types/account';
import { Response } from '../../../types/response';

export type CreateOrUpdateAccount = Account | Omit<Account, 'accountId'>;

export type AccountResponse = Response & { accountId?: number };

const account = async (data: CreateOrUpdateAccount): Promise<AccountResponse> => {
  if (isAccount(data)) {
    // create function

    try {
      await knex('account').where({ accountId: data.accountId }).update(data);
      return ({ code: 'success' });
    } catch {
      return ({ code: 'error' });
    }
  } else {
    // update function

    try {
      const accountId: number = (await knex('account').insert(data))[0];
      return ({ code: 'success', accountId });
    } catch {
      return ({ code: 'error' });
    }
  }
};

export default account;
