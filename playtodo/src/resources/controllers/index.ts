import { Assistence } from '../models'

// Admin
export { default as asigneWork } from './leader/assign-task'

// Assistence
export { default as registerEntry } from './assitence/register_entry'
export { default as registerOut } from './assitence/register_out'

//Leader
export { default as assignTask } from './leader/assign-task'
export { default as getTasks } from './leader/get-tasks'
