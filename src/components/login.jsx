import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";
import { Error } from "./error";
import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { login } from "@/services/apiAuth";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

export const Login = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { data, loading, error, fn: fnLogin } = useFetch(login, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [data, error]);

  const handleLogin = async () => {
    setErrors([]);

    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Email no valido")
          .required("El email es obligatorio"),
        password: Yup.string()
          .min(6, "la contraseña debe tener al menos 6 caracteres")
          .required("La contraseña es obligatoria"),
      });

      await schema.validate(formData, { abortEarly: false });

      // Call API to login
      await fnLogin();
    } catch (errors) {
      const newErrors = {};

      errors?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Iniciar sesión</CardTitle>
        <CardDescription>Accede si ya tienes una cuenta.</CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1 mb-4">
          <Input
            name="email"
            type="email"
            value={formData.email}
            placeholder="Ingresa tu email"
            onChange={handleInputChange}
          />

          {errors.email && <Error message={errors.email} />}
        </div>
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            value={formData.password}
            placeholder="Ingresa tu contraseña"
            onChange={handleInputChange}
          />

          {errors.password && <Error message={errors.password} />}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleLogin} variant="outline">
          {loading ? (
            <BeatLoader size={10} color="#36d7b7" />
          ) : (
            "Iniciar sesión"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
