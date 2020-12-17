import knex from '../../../database';
import { Request, Response } from 'express';

import manager from '../../../functions/manager';

type Req = Request<{ adminSecret: string, hierarchyId: number }, any, any>

export default async function (req: Req, res: Response) {
  const { adminSecret, hierarchyId } = req.params;

  if (!hierarchyId) return res.sendStatus(404);

  const response = await knex('auth').where({ admin_secret: adminSecret });

  if (!response[0]) return res.sendStatus(404);

  const read = await manager.hierarchy.destroy(hierarchyId);
  res.send(read);
}
