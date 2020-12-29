import knex from '../../../database';
import { Request, Response } from 'express';
import actions from '../../../functions/user';
import { Account as ExistentAccount } from '../../../types/account';

type NewAccount = Omit<ExistentAccount, 'accountId'>;

type Req = Request<{ token: string, secret: string }, any, { account: NewAccount | ExistentAccount }>

export default async function (req: Req, res: Response) {
  const { secret, token } = req.params;
  const { account } = req.body;

  if (!account || !secret || !token) return res.sendStatus(404);

  const verification = await knex('user').where({ token, secret });

  if (!verification[0]) {
    return res.send({ code: 'error', message: 'invalid secret' });
  }

  const response = await actions.account(account);

  res.send(response);
};
