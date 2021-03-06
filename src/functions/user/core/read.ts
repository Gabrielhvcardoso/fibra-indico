import knex from '../../../database';

import { Response } from '../../../types/response';
import { User } from '../../../types/user';

export type UserReadResponse = Response & { user?: User };

const read = async (token: string): Promise<UserReadResponse> => {
  const response: Array<User> = await knex('user').where({ token, status: 1 });

  if (!response[0]) {
    return ({
      code: 'error'
    });
  }

  return ({
    code: 'success',
    user: response[0]
  });
};

export default read;
