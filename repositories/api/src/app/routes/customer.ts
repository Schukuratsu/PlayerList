import express from 'express';
import { customerControllers } from '../controllers/customer';
import { createCustomerRules, loginCustomerRules } from '../validators/customer';
import { validate } from '../validators';

const route = '/customer';
const router = express.Router();

router.post('/', createCustomerRules(), validate, customerControllers.createCustomer);
router.post('/login', loginCustomerRules(), validate, customerControllers.loginCustomer);

export default { route, router };
