import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const SignUp = () => {
  const { createUser } = useContext(AuthContext)
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const location = useLocation();
  const navigate = useNavigate()

  const from = location.state?.from?.pathname || '/';

  const onSubmit = data => {

    createUser(data.email, data.password)
      .then(result => {
        const user = result.user;
        console.log(user);

        //update 
        updateProfile(user, {
          displayName: data.name, photoURL: data.photoURL
        })
          .then(() => {
            // Profile updated!
            const saveUser = {name: data.name, email: data.email};
            fetch(`https://bistro-boss-server-alpha.vercel.app/users`, {
              method: "POST",
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(saveUser)

            })
              .then(res => res.json())
              .then(data => {
                if (data.insertedId) {

                  // ...
                  Swal.fire(
                    'Sign Up success',
                    '',
                    'success'
                  )
                  reset()
                  navigate(from, { replace: true });
                }
              })



          })
          .catch((error) => {
            // An error occurred
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      })
  };








  return (
    <>
      <Helmet>
        <title>Bistro Boss | Sign Up</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />

                {errors.name && <span className="text-red-600">Name is required</span>}

              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input type="url" {...register("photoURL", { required: true })} placeholder="PhotoURL" className="input input-bordered" />

                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}

              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />

                {errors.name && <span className="text-red-600">Name is required</span>}

              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" {...register("password",
                  {
                    minLength: 6,
                    maxLength: 20,
                    required: true,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/

                  })} name="password" placeholder="password" className="input input-bordered" />

                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 character</p>}
                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less then 20 character</p>}
                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one uppercase, one lower case, one number and one special character</p>}




                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input type="submit" value="Sign Up" className="btn btn-primary" />
              </div>
            </form>
            <p><small>Allredy have an account <Link to={'/login'}>Login</Link></small></p>

            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;