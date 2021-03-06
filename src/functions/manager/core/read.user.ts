import knex from '../../../database';

import { Response } from '../../../types/response';
import { User } from '../../../types/user';

export type UserReadResponse = Response & { users?: Array<User> };

const read = async (): Promise<UserReadResponse> => {
  try {
    const users: Array<User> = await knex('user');
    return ({ code: 'success', users });
  } catch {
    return ({ code: 'error' });
  }
};

export default read;
