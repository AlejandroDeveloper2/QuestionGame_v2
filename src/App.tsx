import { ToastContainer } from "react-toastify";

import { MainRoutes } from "@routes/index";

function App(): JSX.Element {
  return (
    <>
      <MainRoutes />
      {/* Toast */}
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
