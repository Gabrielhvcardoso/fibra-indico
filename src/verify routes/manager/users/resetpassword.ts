import knex from '../../../database';
import { Request, Response } from 'express';

import manager from '../../../functions/manager';

type Req = Request<{ adminSecret: string }, any, { token: string, password: string }>

export default async function (req: Req, res: Response) {
  const { adminSecret } = req.params;
  const { password, token } = req.body;

  if (!password || !token) return res.sendStatus(404);

  const response = await knex('auth').where({ admin_secret: adminSecret });

  if (!response[0]) return res.sendStatus(404);

  const read = await manager.user.resetPassword(token, password);
  res.send(read);
}
