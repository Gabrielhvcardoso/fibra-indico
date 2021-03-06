import knex from '../../../database';
import { Request, Response } from 'express';
import user from '../../../functions/user';

type Req = Request<{ token: string, secret: string }, any, { amount: number }>

export default async function (req: Req, res: Response) {
  const { secret, token } = req.params;
  const { amount } = req.body;

  if (!amount || !secret || !token) return res.sendStatus(404);

  const verification = await knex('user').where({ token, secret });

  if (!verification[0]) {
    return res.send({ code: 'error', message: 'invalid secret' });
  }

  const response = await user.withdraw(token, amount);
  res.send(response);
};
