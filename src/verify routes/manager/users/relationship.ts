import knex from '../../../database';
import { Request, Response } from 'express';

import manager from '../../../functions/manager';

type Req = Request<{ adminSecret: string, token: string }>

export default async function (req: Req, res: Response) {
  const { adminSecret, token } = req.params;

  const response = await knex('auth').where({ admin_secret: adminSecret });

  if (!response[0]) return res.sendStatus(404);

  const read = await manager.user.relationships(token);
  res.send(read);
}
