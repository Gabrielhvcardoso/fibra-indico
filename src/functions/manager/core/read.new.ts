import knex from '../../../database';

import { Response } from '../../../types/response';
import { User } from '../../../types/user';

export type UserReadResponse = Response & { users?: Array<User> };

const read = async (): Promise<UserReadResponse> => {
  try {
    const response: Array<User> = await knex('user').where({ new: 1 });
    return ({
      code: 'success',
      users: response
    });
  } catch (e) {
    console.log(e);
    return ({ code: 'error' });
  }
};

export default read;
