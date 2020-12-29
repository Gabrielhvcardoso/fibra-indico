import knex from '../../../database';
import { Account } from '../../../types/account';

const read = async (token: string): Promise<Account | null> => {
  try {
    const accounts: Array<Account> = await knex('account').where({ token });
    const account = accounts[accounts.length - 1];
    return account;
  } catch {
    return null;
  }
};

export default read;
