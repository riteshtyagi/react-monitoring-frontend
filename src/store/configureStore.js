import {applyMiddleware, compose, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger'


import rootReducer from './reducers/rootReducer';

const isDevelopment = process.env.NODE_ENV === 'development';

const loggerMiddleware = createLogger();
const middlewares = applyMiddleware(
    thunk.withExtraArgument({})//, loggerMiddleware
);

const enhancers = [middlewares];

export default isDevelopment
    ? createStore(rootReducer, composeWithDevTools(...enhancers))
    : createStore(rootReducer, compose(...enhancers));
