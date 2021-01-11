import crypto from 'crypto';
import knex from '../../../database';
import find from './read';

import { Response } from '../../../types/response';
import { User } from '../../../types/user';

export type NewUser = Omit<User, 'token'>;

export interface UserCreateResponse extends Response {
  token?: string,
  message?: string
}

const create = async (user: NewUser): Promise<UserCreateResponse> => {
  let token = '';

  while (token === '') {
    const temp = crypto.randomBytes(4).toString('hex');
    const response = await knex('user').where({ token: temp });

    if (!response[0]) token = temp;
  }

  if (user.indicatedBy) {
    const response = await find(user.indicatedBy);

    if (!response.user) {
      return ({ code: 'error', message: 'invalid indicatedBy user token' });
    }
  }

  try {
    await knex('user').insert({
      ...user,
      indicatedBy: user.indicatedBy ? user.indicatedBy.toLowerCase() : null,
      token
    });
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
