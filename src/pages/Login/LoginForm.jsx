import logo from '@/assets/images/logo.png';
import AuthContext from '@/context/Auth/AuthContext';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ passwordVisibility, setPasswordVisibility ] = useState(false)
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await login(data);
    navigate("/")
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <img className="py-10" src={logo} alt="Logo" />
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">E-mail</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "O e-mail é obrigatório" })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? 'border-red-500' : ''
              }`}
              placeholder="Seu e-mail"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-6 relative">
            <label htmlFor="senha" className="block text-gray-700 font-bold mb-2">Senha</label>
            <input
              type={passwordVisibility ? "text" : "password"}
              id="senha"
              {...register("senha", { required: "A senha é obrigatória" })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.senha ? 'border-red-500' : ''
              }`}
              placeholder="Sua senha"
            />
            <button onClick={() => setPasswordVisibility(!passwordVisibility)} className="absolute right-4 top-[42px] text-black" type="button">
              {
                passwordVisibility ? <EyeSlash size={24} /> : <Eye size={24} />
              }
            </button>
            {errors.senha && (
              <p className="text-red-500 text-xs mt-1">{errors.senha.message}</p>
            )}
          </div>

          <div className="flex items-center justify-center pt-6">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
