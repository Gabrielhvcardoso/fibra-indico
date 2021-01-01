import { Router } from 'express';
import * as user from './verify routes/user';
import * as manager from './verify routes/manager';

const routes = Router();

// read
routes.get('/u/:token', user.read);

// read recommendations
routes.get('/u/r/:token', user.readRecommendation);

// read withdraw
routes.get('/u/w/:token', user.readWithdraw);

// create: { user: User }
routes.put('/u', user.create);

// update: { user: User }
routes.post('/u/:token/:secret', user.update);

// desativate (destroy user has been deprecated)
routes.delete('/u/:token/:secret', user.desativate);

// auth: { login: string, password: string }
routes.post('/u', user.auth);

// history
routes.get('/u/:token/:secret', user.history);

// withdraw: { amount: number }
routes.post('/u/w/:token/:secret', user.withdraw);

// indicate: { recommendation: Recommendation }
routes.post('/u/i', user.indicate);

// read account
routes.get('/u/a/:token/:secret', user.readAccount);

// account: { account: NewAccount | ExitentAccount }
routes.post('/u/a/:token/:secret', user.account);

// MANAGER ROUTES

// auth: { email: string, password: string }
routes.post('/m', manager.auth.auth);

// create auth: { email: string, password: string }
routes.put('/m/a/:adminSecret', manager.auth.create);

// update auth: { email: string, password: string }
routes.post('/m/a/:adminSecret', manager.auth.update);

// read withdraw
routes.get('/m/w/:adminSecret', manager.withdraws.read);

// status withdraw: { withdrawOrderId: number, status: string }
routes.post('/m/w', manager.withdraws.status);

// read recommendation
routes.get('/m/r/:adminSecret', manager.recommendations.read);

// status recommendation: { recommendationId: number, status: string }
routes.post('/m/r/:adminSecret', manager.recommendations.status);

// ative user
routes.get('/m/u/a/:token/:adminSecret', manager.users.ative);

// read users
routes.get('/m/u/:adminSecret', manager.users.read);

// read new users
routes.get('/m/u/n/:adminSecret', manager.users.readNews);

// read status users
routes.get('/m/u/:status/:adminSecret', manager.users.readStatus);

// status user: { token: string, status: number }
routes.post('/m/u/:adminSecret', manager.users.status);

// user relationship
routes.get('/m/u/r/:token/:adminSecret', manager.users.relationships);

// user reset password: { token: string, password: string }
routes.post('/m/u/:adminSecret', manager.users.resetPassword);

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
