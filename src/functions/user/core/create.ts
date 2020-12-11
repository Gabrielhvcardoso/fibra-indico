import crypto from 'crypto';
import knex from '../../../database';

import { Response } from '../../../types/response';
import { User } from '../../../types/user';

type NewUser = Omit<User, 'token'>;

interface UserCreateResponse extends Response {
  token?: string
}

const create = async (user: NewUser): Promise<UserCreateResponse> => {
  let token = '';

  while (token === '') {
    const temp = crypto.randomBytes(4).toString('hex');
    const response = await knex('user').where({ token: temp });

    if (!response[0]) token = temp;
  }

  const response = await knex('user').insert({ ...user, token });
  if (!response[0]) {
    return ({
      code: 'error'
    });
  }

  return ({
    code: 'success',
    token
  });
};

export default create;
