import knex from '../../../database';
import { Request, Response } from 'express';

import manager from '../../../functions/manager';

type Req = Request<
  { adminSecret: string },
  any,
  { recommendationId: number, status: string }
>

export default async function (req: Req, res: Response) {
  const { adminSecret } = req.params;
  const { recommendationId, status } = req.body;

  const response = await knex('auth').where({ admin_secret: adminSecret });

  if (!response[0] || !recommendationId || !status) return res.sendStatus(404);

  const read = await manager.recommendation.status(recommendationId, status);
  res.send(read);
}
