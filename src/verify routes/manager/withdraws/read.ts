import knex from '../../../database';
import { Request, Response } from 'express';

import manager from '../../../functions/manager';

type Req = Request<{ adminSecret: string }>

export default async function (req: Req, res: Response) {
  const { adminSecret } = req.params;

  const response = await knex('auth').where({ admin_secret: adminSecret });

  if (!response[0]) return res.sendStatus(404);

  const read = await manager.withdraw.read();
  res.send(read);
}
