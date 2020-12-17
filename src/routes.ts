import { Router } from 'express';
import * as user from './verify routes/user';
import * as manager from './verify routes/manager';

const routes = Router();

// read
routes.get('/u/:token', user.read);

// create: { user: User }
routes.put('/u', user.create);

// update: { user: User }
routes.post('/u/:token/:secret', user.update);

// destroy
routes.delete('/u/:token/:secret', user.destroy);

// auth: { login: string, password: string }
routes.post('/u', user.auth);

// history
routes.get('/u/:token/:secret', user.history);

// withdraw: { amount: number }
routes.post('/u/w/:token/:secret', user.withdraw);

// indicate: { recommendation: Recommendation }
routes.post('/u/i', user.indicate);

// read withdraw
routes.get('/m/w', manager.withdraws.read);

// status withdraw: { withdrawOrderId: number, status: string }
routes.post('/m/w', manager.withdraws.status);

// read recommendation
routes.get('/m/r/:adminSecret', manager.recommendations.read);

// status recommendation: { recommendationId: number, status: string }
routes.post('/m/r/:adminSecret', manager.recommendations.status);

// read users
routes.get('/m/u/:status/:adminSecret', manager.users.read);

// status user: { token: string, status: number }
routes.post('/m/u/:adminSecret', manager.users.status);

// read products
routes.get('/m/p', manager.products.read);

// create product: { product: Product }
routes.put('/m/p/:adminSecret', manager.products.create);

// update product: { productId: number, product: Product }
routes.post('/m/p/:adminSecret', manager.products.update);

// delete product: { productId }
routes.delete('/m/p/:adminSecret', manager.products.destroy);

export default routes;
