import ReactDOM from 'react-dom/client'
import './app/layout/index.css'
import 'react-calendar/dist/Calendar.css'
import 'semantic-ui-css/semantic.min.css'
import {store, StoreContext} from "./app/stores/store.ts";
import {RouterProvider} from "react-router-dom";
import {router} from "./app/router/Routes.tsx";


ReactDOM.createRoot(document.getElementById('root')!).render(
      <StoreContext.Provider value={store}>
          <RouterProvider router={router}/>
      </StoreContext.Provider>,
)
