import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import React from "react";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import isEmail from "validator/lib/isEmail";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const CssFormControl = styled(FormControl)({
  "& label.Mui-focused": {
    color: "primary",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#333",
    },
    "&:hover fieldset": {
      borderColor: "primary",
    },
    "&.Mui-focused fieldset": {
      borderColor: "primary",
    },
  },
  "&.MuiFormControl-root": {
    width: "50%",
  },
});

interface ChildProps {
  getInputData(values: FormValues): void;
  handleLData(value: FormValues): void;
}

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

const Login: React.FC<ChildProps> = (props) => {
  const [inputVal, setInputVal] = useState<FormValues>(initialFormValues);
  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const navigate = useNavigate();
  const changeHandler = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;
    const newVal = {
      ...inputVal,
      [name]: value,
    };
    setInputVal(newVal);
  };

  const validateForm = (values: FormValues) => {
    const errors: FormValues = {
      name: "",
      phone: "",
      email: "",
    };

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(values.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!isEmail(values.email)) {
      errors.email = "Email is invalid";
    }

    return errors;
  };

  const handleSubmit = () => {
    const errors = validateForm(inputVal);
    setFormErrors(errors);
    console.log(inputVal);
    if (Object.values(errors).every((error) => error === "")) {
      props.getInputData(inputVal);
      props.handleLData(inputVal);
      navigate("/data");
      setInputVal({ name: "", phone: "", email: "" });
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      autoComplete="off"
    >
      <CssFormControl>
        <InputLabel htmlFor="name">Name*</InputLabel>
        <OutlinedInput
          id="name"
          placeholder="Enter your name"
          label="Name"
          name="name"
          value={inputVal.name}
          onChange={changeHandler}
        />
        {formErrors.name && <div>{formErrors.name}</div>}
      </CssFormControl>
      <CssFormControl>
        <InputLabel htmlFor="phone">Phone*</InputLabel>
        <OutlinedInput
          id="phone"
          placeholder="7696017079"
          label="Phone"
          name="phone"
          value={inputVal.phone}
          onChange={changeHandler}
        />
        {formErrors.phone && <div>{formErrors.phone}</div>}
      </CssFormControl>
      <CssFormControl>
        <InputLabel htmlFor="component-outlined">Email*</InputLabel>
        <OutlinedInput
          id="email"
          placeholder="abc@gmail.com"
          label="Email"
          name="email"
          value={inputVal.email}
          onChange={changeHandler}
        />
        {formErrors.email && <div>{formErrors.email}</div>}
      </CssFormControl>
      <Button variant="outlined" size="large" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default Login;
