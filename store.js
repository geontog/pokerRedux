import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { epic, reducer } from './models/poker';

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
  const store = createStore(
    reducer,
    applyMiddleware(epicMiddleware)
  );

  epicMiddleware.run(epic);

  return store;
}
