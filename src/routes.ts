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

// MANAGER ROUTES

// auth: { email: string, password: string }
routes.post('/m', manager.auth.auth);

// create auth: { email: string, password: string }
routes.put('/m/a/:adminSecret', manager.auth.create);

// update auth: { email: string, password: string }
routes.post('/m/a/:adminSecret', manager.auth.update);

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

// user relationship
routes.get('/m/u/:token/:adminSecret');

// user reset password: { token: string, password: string }
routes.post('/m/u/:adminSecret');

// read products
routes.get('/m/p', manager.products.read);

// create product: { product: Product }
routes.put('/m/p/:adminSecret', manager.products.create);

// update product: { productId: number, product: Product }
routes.post('/m/p/:adminSecret', manager.products.update);

// delete product
routes.delete('/m/p/:productId/:adminSecret', manager.products.destroy);

// read hierarchy
routes.get('/m/h', manager.hierarchies.read);

// create hierarchy: { hierarchy: Hierarchy }
routes.put('/m/h/:adminSecret', manager.hierarchies.create);

// update hierarchy: { hierarchyId: number, hierarchy: Hierarchy }
routes.post('/m/h/:adminSecret', manager.hierarchies.update);

// destroy hierarchy
routes.delete('/m/h/:hierarchyId/:adminSecret', manager.hierarchies.destroy);

export default routes;
