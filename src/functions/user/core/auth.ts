import knex from '../../../database';
import { Response } from '../../../types/response';
import { User } from '../../../types/user';

export type UserAuthResponse = Response & { user?: User };

const auth = async (login: string, password: string): Promise<UserAuthResponse> => {
  const response: Array<User> = await knex('user')
    .where({ email: login, password })
    .orWhere({ cpf: login, password });

  if (!response[0]) {
    return ({ code: 'error' });
  }

  return ({
    code: 'success',
    user: response[0]
  });
};

export default auth;
