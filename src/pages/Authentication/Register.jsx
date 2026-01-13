
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from './SocialLogin';
import axios from 'axios';
import { useState } from 'react';
import useAxios from '../../hooks/useAxios';


const Register = () => {


    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const [profilePic, setProfilePic] = useState();
    const axiosInstance = useAxios();


    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(async (result) => {
                const user = result.user;

                //step-2 update userinfo in the database
                // post data in backend 
                const userInfo = {
                    email: data.email,
                    role: 'user',
                    created_at: new Date().toISOString(),
                    last_login: new Date().toISOString()
                }

                const userRes = await axiosInstance.post('/users', userInfo);
                console.log('user data', userRes.data);

                // step-1 update user profile in firebase 
                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                }
                updateUserProfile(userProfile)
                    .then(() => {
                        console.log('user profile updated');
                    })
                    .catch(error => {
                        console.error(error);
                    })

                console.log(user);
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleImageUpload = async event => {
        const imageFile = event.target.files[0];
        console.log(imageFile);
        const formData = new FormData();
        formData.append('image', imageFile);

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
        const res = await axios.post(imageUploadUrl, formData);
        // console.log(res.data.data.url);
        setProfilePic(res.data.data.url);


    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Create an Account!</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">

                        <label className="label">Name</label>

                        <input type="text" {...register('name', { required: true })} className="input" placeholder="Name" />
                        {errors.email?.type === 'required' && <span className="text-red-500">This field is required</span>}


                        <input type="file" onChange={handleImageUpload} className="file-input file-input-ghost" />




                        <label className="label">Email</label>
                        <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                        {errors.email?.type === 'required' && <span className="text-red-500">This field is required</span>}


                        <label className="label">Password</label>
                        <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />


                        {errors.password?.type === 'required' && <span className="text-red-500">Password must be required</span>}
                        {errors.password?.type === 'minLength' && <span className="text-red-500">Password must be at least 6 characters</span>}

                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-success mt-4">Sign up</button>

                    </fieldset>
                    <p><small>Already have an account? <Link className='btn-link' to="/login">Sign up</Link> </small></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;