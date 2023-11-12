import Router from 'koa-router';
import * as crawlService from './index.service.js';

const crawl = new Router();

crawl.get('/', crawlService.getJobs);

export default crawl;
