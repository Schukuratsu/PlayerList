import express from 'express';
import { customerControllers } from '../controllers/customer';
import { customerRules } from '../validators/customer';
import { validate } from '../validators';

const route = '/customer';
const router = express.Router();

router.post('/', customerRules.createCustomer(), validate, customerControllers.createCustomer);

router.post('/login', customerRules.loginCustomer(), validate, customerControllers.loginCustomer);

export default { route, router };
