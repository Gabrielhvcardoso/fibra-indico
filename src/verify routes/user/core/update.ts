import knex from '../../../database';
import { Request, Response } from 'express';
import actions from '../../../functions/user';
import { User } from '../../../types/user';

type Req = Request<{ token: string, secret: string }, any, { user: User }>

export default async function (req: Req, res: Response) {
  const { secret, token } = req.params;
  const { user } = req.body;

  if (!user || !secret || !token) return res.sendStatus(404);

  const verification = await knex('user').where({ token, secret });

  if (!verification[0]) {
    return res.send({ code: 'error', message: 'invalid secret' });
  }

  const response = await actions.update(token, user);

  res.send(response);
};
