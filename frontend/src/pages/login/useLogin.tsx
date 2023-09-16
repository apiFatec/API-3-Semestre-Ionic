import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import services from '../../services/userServices';
import useAuth from "@/hooks/useAuth";

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [textEntry, setTextEntry] = useState('password');
  const [iconPassword, setIconPassword] = useState(true);

  const navigate = useNavigate();

  const { login } = useAuth();

  const loginUser = useCallback(async (data: { username: string, password: string }) => {
    try {
      setIsLoading(true);
      const response = await services.Login(data);
      login(response.data);

      navigate('/dashboard');

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    loginUser
  }
}