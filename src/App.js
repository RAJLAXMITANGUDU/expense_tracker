import Home from "./pages/Home/Home";
import {snackbarProvider} from "notistack";

export default function App(){
  return (
    <snackbarProvider>
      <Home />
    </snackbarProvider>
  );
}