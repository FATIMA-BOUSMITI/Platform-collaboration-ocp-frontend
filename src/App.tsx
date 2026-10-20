
import RealtimeBridge from "./features/collaboration/RealtimeBridge";
import { Toaster } from "sonner";
import AppRouter from './routes/AppRouter';

function App() {

  return <>
       <><RealtimeBridge/><AppRouter /><Toaster richColors closeButton position="top-right"/></>
  </>

}

export default App;