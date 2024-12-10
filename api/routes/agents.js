import express from 'express';
import { auth } from '../middleware/auth.js';
import { 
    createAgent, 
    getAgents, 
    getAgentById,
    updateAgent,
    deleteAgent,
    controlAgent
} from '../controllers/agentController.js';

const router = express.Router();

router.use(auth);

router.post('/', createAgent);
router.get('/', getAgents);
router.get('/:id', getAgentById);
router.put('/:id', updateAgent);
router.delete('/:id', deleteAgent);
router.post('/:id/control', controlAgent);

export default router; 