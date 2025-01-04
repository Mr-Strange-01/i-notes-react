import { applyMiddleware, legacy_createStore as creteStore} from "redux";
import reducers from "./reducers";
import { thunk } from "redux-thunk";


export const store = creteStore(reducers, {}, applyMiddleware(thunk));