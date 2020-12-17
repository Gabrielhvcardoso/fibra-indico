import knex from '../../../database';
import { Request, Response } from 'express';

import { UpdateHierarchy } from '../../../functions/manager/core/update.hierarchy';
import manager from '../../../functions/manager';

type Req = Request<{ adminSecret: string }, any, { hierarchyId: number, hierarchy: UpdateHierarchy }>

export default async function (req: Req, res: Response) {
  const { adminSecret } = req.params;
  const { hierarchyId, hierarchy } = req.body;

  if (!hierarchyId || !hierarchy) return res.sendStatus(404);

  const response = await knex('auth').where({ admin_secret: adminSecret });

  if (!response[0]) res.sendStatus(404);

  const read = await manager.hierarchy.update(hierarchyId, hierarchy);
  res.send(read);
}
