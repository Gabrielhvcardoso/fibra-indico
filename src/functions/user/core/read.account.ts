import knex from '../../../database';
import { Account } from '../../../types/account';

const read = async (token: string): Promise<Account | null> => {
  try {
    const account: Account = (await knex('account').where({ token }))[0];
    return account;
  } catch {
    return null;
  }
};

export default read;
