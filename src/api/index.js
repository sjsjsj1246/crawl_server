import Router from 'koa-router';
import crawl from './crawl/index.js';

const api = new Router();

api.use('/crawl', crawl.routes());

export default api;
