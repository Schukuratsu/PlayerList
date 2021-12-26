import express from 'express';
import { customerControllers } from '../controllers/customer';
import { createCustomerRules } from '../validators/customer';
import { validate } from '../validators';

const route = '/customer';
const router = express.Router();

router.post('/', createCustomerRules(), validate, customerControllers.createCustomer);

export default { route, router };
