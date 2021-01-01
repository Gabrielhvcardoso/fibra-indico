import crypto from 'crypto';
import knex from '../../../database';

import { Response } from '../../../types/response';
import { User } from '../../../types/user';

export type NewUser = Omit<User, 'token'>;

export interface UserCreateResponse extends Response {
  token?: string
}

const create = async (user: NewUser): Promise<UserCreateResponse> => {
  let token = '';

  while (token === '') {
    const temp = crypto.randomBytes(4).toString('hex');
    const response = await knex('user').where({ token: temp });

    if (!response[0]) token = temp;
  }

  try {
    await knex('user').insert({ ...user, token });
    return ({
      code: 'success',
      token
    });
  } catch (e) {
    console.log(e);
    return ({ code: 'error' });
  }
};

export default create;
