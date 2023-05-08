import axios from 'axios';
import { isServer } from '../utils';

export default axios.create({ baseURL: '/api' });
// export default axios.create({ baseURL: isServer() ? `http://suresh.localhost:${process.env.PORT}/api` : '/api' });

export const createInstance = (subDomain: string) => axios.create({ baseURL: 'http://' + subDomain + `${isServer() ? ':3000' : ':3000'}` + '/api' });
// export const createInstance = (subDomain: string) => axios.create({ baseURL: 'http://' + subDomain + `${isServer() ? ':3000' : ':3000'}` + '/api' });
