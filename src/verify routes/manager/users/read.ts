import knex from '../../../database';
import { Request, Response } from 'express';

import manager from '../../../functions/manager';

type Req = Request<{ status: number, adminSecret: string }>

export default async function (req: Req, res: Response) {
  const { adminSecret, status } = req.params;

  const response = await knex('auth').where({ admin_secret: adminSecret });

  if (!response[0]) res.sendStatus(404);

  const read = await manager.user.read(status);
  res.send(read);
}
