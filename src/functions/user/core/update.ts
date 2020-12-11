import knex from '../../../database';

import { Response } from '../../../types/response';
import { User } from '../../../types/user';

const update = async (token: string, user: User): Promise<Response> => {
  try {
    await knex('user').update(user).where({ token });
    return ({ code: 'success' });
  } catch {
    return ({ code: 'error' });
  }
};

export default update;
