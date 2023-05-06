import { Box, FormGroup, FormHelperText } from "@mui/material";
import { useReducer, useState, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { LockIcon } from "../../commons/resources";
import { AlertCustom, Container, FormHelperTextCustom, InputCustom, Label, WrapButton, WrapContent, WrapForm, WrapInput, WrapTitle } from "./styles";
import { routers } from "../../commons/routers";
import { resetPassword } from "../../commons/utils/userRequest";

interface IForm {
  password: {
    value: string;
    error?: string;
    touched?: boolean;
  };
  confirmPassword: {
    value: string;
    error?: string;
    touched?: boolean;
  }

}
const formReducer = (state: IForm, event: any) => {
  return {
    ...state,
    [event.name]: {
      value: event.value || '',
      error: event.error || !event.value,
      touched: event.touched,
    }
  }
}
export default function ResetPassword() {
  const history = useHistory();
  const path = useLocation();
  const [code, setCode] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [hasErrorField, setHasErrorField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useReducer(formReducer, {
    confirmPassword: {
      value: '',
    },
    password: {
      value: '',
    },
  });
  const getError = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case 'password':
        if (!value) {
          error = "Please enter your Password";
        } else if (value.length < 8 || value.length > 60 || !/^[a-zA-Z0-9!@#$%^&*]+$/.test(value)) {
          error = "Invalid Password";
        }
        break;
      case 'confirmPassword':
        if (!value) {
          error = "Please enter your Confirm Password";
        } else if (value !== formData.password.value) {
          error = "Confirm Password does not match";
        }
        break;
      default:
    }
    return error;
  }
  useEffect(() => {
    const params = new URLSearchParams(path.search);
    const code = params.get('code');
    if (code) {
      setCode(code);
    } else {
      history.push(routers.SIGN_IN);
    }
  }, [path.search]);

  useEffect(() => {
    setHasErrorField(Boolean(formData.confirmPassword.error || formData.password.error));
  }, [formData]);

  const handleChange = (event: any) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
      touched: true,
      error: getError(event.target.name, event.target.value)
    });
  }
  const handleResetPassword = async (password: string) => {
    try {
      setLoading(true);
      const { data } = await resetPassword({ code, password });
      if (data.code === 'SS_0') {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const errorPassword = getError('password', formData.password.value);
    const errorConfirmPassword = getError('confirmPassword', formData.confirmPassword.value);
    if (errorConfirmPassword) {
      setFormData({
        name: 'confirmPassword',
        touched: true,
        error: errorConfirmPassword,
      })
    }
    if (errorPassword) {
      setFormData({
        name: 'password',
        touched: true,
        error: errorPassword,
      })
    }
    if (!hasErrorField) {
      handleResetPassword(formData.password.value);
    }
  }
  return (
    <Container>
      <WrapContent>
        <WrapTitle>
          Reset Password
        </WrapTitle>
        <FormGroup>
          {
            !success ?
              (<WrapForm>
                {error ? <AlertCustom severity="error">Something was wrong!</AlertCustom> : null}
                <WrapInput>
                  <Label>
                    New Password
                  </Label>
                  <InputCustom
                    startAdornment={<Box paddingRight={"10px"} paddingTop={"5px"} paddingBottom={"2px"}>
                      <LockIcon />
                    </Box>}
                    name="password"
                    onChange={handleChange}
                    fullWidth
                    type="password"
                    placeholder="New Password"
                    style={{
                      borderColor: (formData.password.error && formData.password.touched) ? "#DD4343" : ""
                    }}
                  />
                  {(formData.password.error && formData.password.touched) ? <FormHelperTextCustom error>{formData.password.error}</FormHelperTextCustom> : null}
                </WrapInput>
                <WrapInput>
                  <Label>
                    Confirm New Password
                  </Label>
                  <InputCustom
                    startAdornment={<Box paddingRight={"10px"} paddingTop={"5px"} paddingBottom={"2px"}>
                      <LockIcon />
                    </Box>}
                    fullWidth
                    name="confirmPassword"
                    onChange={handleChange}
                    type="password"
                    placeholder="Confirm Password"
                    style={{
                      borderColor: (formData.confirmPassword.error && formData.confirmPassword.touched) ? "#DD4343" : ""
                    }}
                  />
                  {(formData.confirmPassword.error && formData.confirmPassword.touched) ? <FormHelperText error>{formData.confirmPassword.error}</FormHelperText> : null}
                </WrapInput>
                <WrapButton variant="contained" fullWidth onClick={handleSubmit} disabled={loading}>
                  Submit
                </WrapButton>
              </WrapForm>)
              : (
                <WrapForm>
                  <Label>
                    Your password has been reset successfully
                  </Label>
                  <WrapButton variant="contained" fullWidth onClick={() => history.push(routers.SIGN_IN)}>
                    Sign In
                  </WrapButton>
                </WrapForm>
              )}
        </FormGroup>
      </WrapContent>
    </Container >
  )
}