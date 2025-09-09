import React, {useContext, useState} from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { API_PATHS } from "../../utils/apiPath";
import  axiosInstance  from "../../utils/axiosInstance";
import { UserContext } from "../../context/userContext";
import uplaodImage from '../../utils/uploadImage';

const SignUp = () => {
const [profilePic, setProfilePic] = useState(null);
const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);


const {updateUser} = useContext(UserContext);
const navigate = useNavigate();


const handleSignUp = async (e) => {
e.preventDefault();
if (loading) return;


setError(null);


if(!fullName) {
setError("Please enter your full name");
return;
}
if(!validateEmail(email)) {
setError("Please enter a valid email address");
return;
}
if(!password) {
setError("Please enter a valid password");
return;
}


//SignUp API call
setLoading(true);
try {
let profileImageUrl = "";
if(profilePic) {
// keep the spinner while uploading the image as well
const imgUploadRes = await uplaodImage(profilePic);
profileImageUrl = imgUploadRes.imageUrl || "";
}


const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
fullName,
email,
password,
profileImageUrl
});


const { token, user } = response.data;


if (token) {
localStorage.setItem("token", token);
updateUser(user);
setLoading(false);
navigate("/dashboard");
} else {
setError("Invalid response from server");
setLoading(false);
}
} catch (err) {
console.error("SignUp error:", err);
if (err.response && err.response.data && err.response.data.message) {
setError(err.response.data.message);
} else {
setError("Something went wrong. Please try again.");
}
setLoading(false);
}
};

return (
<AuthLayout>
<div className="lg:w-[70%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
<h3 className="text-xl font-semibold text-black">Create an account</h3>
<p className="text-xs text-slate-700 mt-[5px] mb-6">Join us today by entering your details</p>
<form onSubmit={handleSignUp}>
<ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
<div className="gflex flex-col gap-4">
<Input
value={fullName}
onChange={({ target }) => setFullName(target.value)}
label = "Full Name"
placeholder = "John Doe"
type='text'
/>
<Input
value={email}
onChange={({ target }) => setEmail(target.value)}
label = "Email Address"
placeholder = "john@example.com"
type='text'
/>
<div className='col-span-2'>
<Input
value={password}
onChange={({ target }) => setPassword(target.value)}
label = "Password"
placeholder = "Min 8 characters"
type='password'
/>
</div>
</div>
{error && <p className='text-xs text-red-500 pb-2.5' role="alert">{error}</p>}


<button
type="submit"
className={`btn-primary flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
disabled={loading}
aria-busy={loading}
>
{loading ? (
<>
<span className='loader' aria-hidden="true" />
Creating account...
</>
) : (
'SIGN UP'
)}
</button>


<p className="text-[13px] text-slate-800 mt-3">
Already have an account?{' '}
<Link className='font-medium text-primary underline' to="/Login">Login</Link>
</p>
</form>
</div>
</AuthLayout>
)
}


export default SignUp;