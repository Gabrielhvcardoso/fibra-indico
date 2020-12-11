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

  const response = await knex('auth').where({ admin_secret: adminSecret });

  if (!response[0] || !token || !status) res.sendStatus(404);

  const read = await manager.user.status(token, status);
  res.send(read);
}
