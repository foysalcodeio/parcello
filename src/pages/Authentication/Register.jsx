
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from './SocialLogin';


const Register = () => {
    const { register, handleSubmit, formState: {errors} } = useForm();

    const { createUser } = useAuth();

    const onSubmit = data => {
        console.log(data);
        console.log(createUser);
        createUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user);
        })
        .catch(error => {
            console.error(error);
        })
    }

    const handleImageUpload = event => {
        const imageFile = event.target.files[0];
        console.log(imageFile);
    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Create an Account!</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">

                        <label className="label">Name</label>

                        <input type="text" {...register('name', {required: true})} className="input" placeholder="Name" />
                        {errors.email?.type === 'required' && <span className="text-red-500">This field is required</span>}


                        <input type="file" onChange={handleImageUpload} className="input" placeholder="Name" />
                        {errors.email?.type === 'required' && <span className="text-red-500">This field is required</span>}


                        
                        <label className="label">Email</label>
                        <input type="email" {...register('email', {required: true})} className="input" placeholder="Email" />
                        {errors.email?.type === 'required' && <span className="text-red-500">This field is required</span>}


                        <label className="label">Password</label>
                        <input type="password" {...register('password', {required: true, minLength:6})} className="input" placeholder="Password" />

                        
                        {errors.password?.type === 'required' && <span className="text-red-500">Password must be required</span>}
                        {errors.password?.type === 'minLength' && <span className="text-red-500">Password must be at least 6 characters</span>}

                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-success mt-4">Login</button>

                    </fieldset>
                    <p><small>Already have an account? <Link className='btn-link' to="/login">Login</Link> </small></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;