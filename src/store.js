import { createStore, compose } from 'redux';

import reducers from './reducers';

const store = () => (
  createStore(
    reducers,
    compose(window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION()),
  )
);

export default store();
