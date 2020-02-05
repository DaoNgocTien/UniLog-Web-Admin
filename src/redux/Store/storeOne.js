import { createStore, applyMiddleware } from './../../../node_modules/redux';
import {createLogger} from './../../../node_modules/redux-logger';
import rootReducer from '../Reducer/index';

const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

export function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState);
}