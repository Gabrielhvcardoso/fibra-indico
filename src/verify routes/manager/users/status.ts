import knex from '../../../database';
import { Request, Response } from 'express';

import manager from '../../../functions/manager';

type Req = Request<
  { adminSecret: string },
  any,
  { token: string, status: number }
>

export default async function (req: Req, res: Response) {
  const { adminSecret } = req.params;
  const { token, status } = req.body;

  if (!token || !([0, 1].some(item => item === status))) return res.sendStatus(404);

  const response = await knex('auth').where({ admin_secret: adminSecret });

  if (!response[0]) return res.sendStatus(404);

  const read = await manager.user.status(token, status ?? 0);
  res.send(read);
}
