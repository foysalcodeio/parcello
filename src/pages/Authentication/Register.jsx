import React from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
    const { register, handleSubmit, formState: {errors} } = useForm();

    const onSubmit = data => {
        console.log(data);
    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Create an Account!</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" {...register('email', {required: true})} className="input" placeholder="Email" />
                        {errors.email?.type === 'required' && <span className="text-red-500">This field is required</span>}


                        <label className="label">Password</label>
                        <input type="password" {...register('password', {required: true, minLength:6})} className="input" placeholder="Password" />
                        {errors.password?.type === 'required' && <span className="text-red-500">Password must be required</span>}
                        {errors.password?.type === 'minLength' && <span className="text-red-500">Password must be at least 6 characters</span>}

                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Register;