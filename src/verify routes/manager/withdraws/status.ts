import knex from '../../../database';
import { Request, Response } from 'express';

import manager from '../../../functions/manager';

type Req = Request<
  { adminSecret: string },
  any,
  { withdrawOrderId: number, status: string }
>

export default async function (req: Req, res: Response) {
  const { adminSecret } = req.params;
  const { withdrawOrderId, status } = req.body;

  const response = await knex('auth').where({ admin_secret: adminSecret });

  if (!response[0] || !withdrawOrderId || !status) res.sendStatus(404);

  const read = await manager.withdraw.status(withdrawOrderId, status);
  res.send(read);
}
