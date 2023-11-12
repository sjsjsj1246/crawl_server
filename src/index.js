import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import api from './api/index.js';
import cors from "@koa/cors";

const app = new Koa();
const router = new Router();

//라우터 설정
router.use(api.routes());

app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
}))
//라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const port = 8080;
app.listen(port, () => {
  console.log('listening to port %d', port);
});
