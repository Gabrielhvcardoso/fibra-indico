import knex from '../../../database';
import { Request, Response } from 'express';

import manager from '../../../functions/manager';

type Req = Request<{ adminSecret: string }, any, { email: string, password: string }>

export default async function (req: Req, res: Response) {
  const { adminSecret } = req.params;
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(404);

  const response = await knex('auth').where({ admin_secret: adminSecret });

  if (!response[0]) return res.sendStatus(404);

  const read = await manager.auth.create(email, password);
  res.send(read);
}
