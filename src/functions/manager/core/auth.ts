/* eslint-disable camelcase */
import knex from '../../../database';
import { Response } from '../../../types/response';

export type AuthResponse = Response & { admin_secret?: string };

const auth = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await knex('auth').where({ email, password });

  if (!response[0]) return ({ code: 'error' });

  return ({
    code: 'success',
    admin_secret: response[0].admin_secret
  });
};

export default auth;
