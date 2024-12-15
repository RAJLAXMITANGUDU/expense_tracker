import Home from "./pages/Home/Home";
import {SnackbarProvider} from "notistack";

export default function App(){
  return (
    <SnackbarProvider>
      <Home />
    </SnackbarProvider>
  );
}