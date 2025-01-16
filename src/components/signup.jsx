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
import { signUp } from "@/services/apiAuth";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

export const SignUp = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_picture: null,
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const logLink = searchParams.get("createNew");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const { data, loading, error, fn: fnSignup } = useFetch(signUp, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${logLink ? `createNew=${logLink}` : ""}`);
      fetchUser();
    }
  }, [error, loading]);

  const handleSignup = async () => {
    setErrors([]);

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("El nombre es obligatorio"),
        email: Yup.string()
          .email("Email no valido")
          .required("El email es obligatorio"),
        password: Yup.string()
          .min(6, "la contraseña debe tener al menos 6 caracteres")
          .required("La contraseña es obligatoria"),
        profile_pic: Yup.mixed().required("La foto de perfil es obligatoria"),
      });

      await schema.validate(formData, { abortEarly: false });

      // Call API to login
      await fnSignup();
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
        <CardTitle>Registrarse</CardTitle>
        <CardDescription>
          Crea una cuenta nueva si aún no la tienes.
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="name"
            type="text"
            value={formData.name}
            placeholder="Ingresa tu nombre"
            onChange={handleInputChange}
          />

          {errors.name && <Error message={errors.name} />}
        </div>
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            className="mt-4"
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
            className="mt-4"
            value={formData.password}
            placeholder="Ingresa tu contraseña"
            onChange={handleInputChange}
          />

          {errors.password && <Error message={errors.password} />}
        </div>
        <div className="space-y-1">
          <Input
            name="profile_pic"
            type="file"
            className="mt-4"
            accept="image/*"
            onChange={handleInputChange}
          />

          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleSignup} variant="outline">
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Registrarse"}
        </Button>
      </CardFooter>
    </Card>
  );
};
