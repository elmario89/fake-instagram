import React, {FormEvent, useState } from 'react';
import LoginModel from '../models/Login';
import LoginResponseModel from '../models/LoginResponse';
import HttpClient from '../services/http.service';
import { useForm } from 'react-hook-form';
import debounce from 'debounce';

function Main() {
    const [value, setValue] = useState('');
    const methods = useForm();

    const {
        register,
        getValues,
        formState: { errors, isDirty },
        watch,
        handleSubmit,
    } = methods;

    const login = async (data: LoginModel) => {
        const response = await HttpClient.Build('http://localhost:3001/')
            .postRequest<LoginModel, LoginResponseModel>('api/auth/login', data);

        return response;
    }

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const values = getValues();
        const clear = Object.keys(values)
            .filter((k) => values[k])
            .reduce((a, k) => ({ ...a, [k]: values[k] }), {});

        const response = await login({...clear as LoginModel})

        console.log(response);
    };

    const hasErrors = (): boolean => errors && Object.keys(errors).length > 0 && errors.constructor === Object;

    return (
       <div className="main">
           <form className="form">
               <label htmlFor="email">
                   Email
                   <input
                       id="email" type="text"
                       {...register('email', {
                           required: true
                       })}
                   />
               </label>

               <label htmlFor="password">
                   Email
                   <input
                       id="password" type="text"
                       {...register('password', {
                           required: true
                       })}
                   />
               </label>
               <button
                   disabled={hasErrors()}
                   onClick={(e: FormEvent) => onSubmit(e)}
               >Submit</button>
           </form>
       </div>
    );
}

export default Main;
