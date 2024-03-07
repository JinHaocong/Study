import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.scss'
import {Provider} from "react-redux";
import store, {persistor} from "@/store";
import {PersistGate} from "redux-persist/integration/react";
import 'normalize.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        {/*等待 Redux store 中的持久化数据加载完成后再渲染应用*/}
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>
)
