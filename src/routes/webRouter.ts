/**
 * ==================================================================
 * Copyright © Dinámica Digital S.A.S.
 * Author: Neyib Alexander Daza Guerrero
 * Email: dev.alexander.daza@gmail.com
 * ==================================================================
 */

import {Router} from 'express';

const router: Router = Router();

// Import controllers
import {indexController} from '../controllers/web/indexController';

// Site Router
router.get('/', indexController.indexAction);
router.get('/contacto/:service', indexController.contactAction);
router.post('/contacto', indexController.storeContact);

export default router;
