import { useForm } from 'react-hook-form';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm();

    const onSubmit = data => console.log(data);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">

                    <label className="label">Email</label>
                    <input type="email"
                        {...register('email', {
                            required: "Email Address is required"
                        })}
                        aria-invalid={errors.email ? "true" : "false"} className="input" placeholder="Email" />

                    {errors.email && <p role="alert">{errors.email.message}</p>}

                    <label className="label">Password</label>
                    <input
                        type="password" {...register('password', {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })} className="input" placeholder="Password"
                    />

                    {/* {errors.password && <p role="alert">{errors.password.message}</p>} */}
                    {/* or */}

                    {errors.password?.type === 'required' && (
                        <p className="text-red-500">Password is required</p>
                    )}
                    {
                        errors.password?.type=='minLength' &&  <p className='text-red-500'>Password Must be 6 characters or longer</p>
                    }


                    <div>
                        <a className="link link-hover">Forgot password?</a>
                    </div>

                    <button type="submit" className="btn btn-neutral mt-4">
                        Login
                    </button>

                </fieldset>
            </form>
        </div>
    );
};

export default Login;
