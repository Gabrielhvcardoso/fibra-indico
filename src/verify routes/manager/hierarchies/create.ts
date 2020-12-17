import knex from '../../../database';
import { Request, Response } from 'express';

import { NewHierarchy } from '../../../functions/manager/core/create.hierarchy';
import manager from '../../../functions/manager';

type Req = Request<{ adminSecret: string }, any, { hierarchy: NewHierarchy }>

export default async function (req: Req, res: Response) {
  const { adminSecret } = req.params;
  const { hierarchy } = req.body;

  if (!hierarchy) return res.sendStatus(404);

  const response = await knex('auth').where({ admin_secret: adminSecret });

  if (!response[0]) return res.sendStatus(404);

  const read = await manager.hierarchy.create(hierarchy);
  res.send(read);
}
