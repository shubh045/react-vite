import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewData from "./components/ViewData/ViewData";
import { useLocalStorage } from "./customHooks/useLocalStorage";
import { useState } from "react";

interface FormValues {
  name: string;
  phone: string;
  email: string;
}

const initialFormValues: FormValues = {
  name: "",
  phone: "",
  email: "",
};

const App: React.FC = () => {
  const [data, setData] = useState<Array<FormValues>>([initialFormValues]);
  const [lData, setLData] = useLocalStorage<FormValues>(
    `User ${data.length - 1}`,
    initialFormValues
  );

  const getInputData = (values: FormValues): void => {
    setData([values, ...data]);
  };

  const handleLData = (value: FormValues): void => {
    setLData(value);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Login getInputData={getInputData} handleLData={handleLData} />
            }
          />
          <Route path="/data" element={<ViewData />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
