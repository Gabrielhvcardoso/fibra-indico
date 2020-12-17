/* eslint-disable camelcase */
import crypto from 'crypto';
import knex from '../../../database';
import { Response } from '../../../types/response';

export type AuthCreateResponse = Response & { admin_secret?: string };

const create = async (email: string, password: string): Promise<AuthCreateResponse> => {
  const admin_secret = crypto.randomBytes(64).toString('hex');

  try {
    await knex('auth').insert({ email, password, admin_secret });
    return ({ code: 'success', admin_secret });
  } catch {
    return ({ code: 'error' });
  }
};

export default create;
