import knex from '../../../database';
import { Request, Response } from 'express';

import manager from '../../../functions/manager';

type Req = Request<{ token: string, adminSecret: string }>

export default async function (req: Req, res: Response) {
  const { token, adminSecret } = req.params;

  if (!adminSecret) return res.sendStatus(404);

  const response = await knex('auth').where({ admin_secret: adminSecret });

  if (!response[0] || !token) return res.sendStatus(404);

  const read = await manager.user.ative(token);
  res.send(read);
}
