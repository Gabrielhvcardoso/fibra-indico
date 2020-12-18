import knex from '../../../database';

import { Response } from '../../../types/response';
import { User } from '../../../types/user';

export type UserReadStatusResponse = Response & { users?: Array<User> };

const read = async (status: number): Promise<UserReadStatusResponse> => {
  try {
    const users: Array<User> = await knex('user').where({ status });
    return ({ code: 'success', users });
  } catch {
    return ({ code: 'error' });
  }
};

export default read;
