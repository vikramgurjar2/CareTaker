"use client";
import { register, signUpGoogle } from "@/actions/user/auth";
import { ActionButton } from "@/components/actionButton";
import { SelectInput } from "@/components/selectInput";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "The Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo, Democratic Republic of the",
  "Congo, Republic of the",
  "Costa Rica",
  "Côte d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor (Timor-Leste)",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "The Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia, Federated States of",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Sudan, South",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const countryOptions = countries.map((country) => {
  return {
    id: country.replace(/[^a-zA-Z]/g, "").toLowerCase(),
    displayName: country,
  };
});

const genderOptions = [
  { id: "male", displayName: "Male" },
  { id: "female", displayName: "Female" },
];

const bloodGroupsOptions = [
  { id: "a+", displayName: "A+" },
  { id: "a-", displayName: "A-" },
  { id: "b+", displayName: "B+" },
  { id: "b-", displayName: "B-" },
  { id: "ab+", displayName: "AB+" },
  { id: "ab-", displayName: "AB-" },
  { id: "o+", displayName: "O+" },
  { id: "o-", displayName: "O-" },
];

const userRoleOptions = [
  { id: "patient", displayName: "Patient" },
  { id: "doctor", displayName: "Doctor" },
];

const SignUpPage = () => {
  const router = useRouter();
  const ref = useRef();

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [userRole, setUserRole] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [image, setImage] = useState({
    publicId: "",
    width: 0,
    height: 0,
    secureURL: "",
  });

  async function handleGoogleRegistrationSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;
    const { result, message } = await signUpGoogle(accessToken);
    if (result) {
      router.push(`/dashboard`);
    } else {
      toast.error(message);
    }
    setLoading(false);
  }

  const register_google = useGoogleLogin({
    onSuccess: handleGoogleRegistrationSuccess,
  });

  const handleSubmit = async () => {
    try {
      console.log("Submitting signup form...");
      setLoading(true);
      if (
        !username ||
        !email ||
        !password ||
        !gender ||
        !country ||
        !height ||
        !weight ||
        !bloodGroup ||
        !userRole ||
        !maritalStatus ||
        !image.secureURL
      ) {
        toast.error("Please complete all fields");
        return;
      }

      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!email.match(mailformat)) {
        toast.error("Invalid email!");
        return;
      }

      if (password.length < 8) {
        toast.error("Password must be atleast 8 characters long");
        return;
      }

      var numberFormat = /^^\d+(\.\d+)?$/;
      if (!height.match(numberFormat) || !weight.match(numberFormat)) {
        toast.error("Please enter valid numeric values");
        return;
      }

      const { result, message } = await register({
        name: username,
        email,
        password,
        gender,
        country,
        height: parseInt(height),
        weight: parseInt(weight),
        bloodGroup,
        userRole,
        maritalStatus,
        profile_pic: image.secureURL,
      });

      if (result) {
        router.push("/dashboard");
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGender = (value) => {
    setGender(value);
  };

  const handleCountry = (value) => {
    setCountry(value);
  };

  const handleHeight = (e) => {
    if (e.target.value[0] != "0") setHeight(e.target.value);
    else setHeight("");
  };

  const handleWeight = (e) => {
    if (e.target.value[0] != "0") setWeight(e.target.value);
    else setWeight("");
  };

  const onMaritalStatusChange = (e) => {
    setMaritalStatus(e.target.value);
  };

  const handleBloodGroup = (value) => {
    setBloodGroup(value);
  };

  const handleUserRole = (value) => {
    setUserRole(value);
  };

  const onUploadSuccessHandler = (result) => {
    if (!result?.info?.secure_url) {
      toast.error("Image upload failed. Please try again.");
      return;
    }
    setImage(() => ({
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url,
    }));
    console.log("Image uploaded successfully:", result?.info?.secure_url);
  };

  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jsm_caretakr");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dcnpnyqvb/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.secure_url) {
        setImage({
          publicId: data.public_id,
          width: data.width,
          height: data.height,
          secureURL: data.secure_url,
        });
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      toast.error("Image upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      {/* Simple Header */}
      <div className="mb-8">
        <div className="max-w-md mx-auto text-center">
          <Link
            href="/signin"
            className="text-blue-600 hover:underline text-sm"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {loading ? "Creating account..." : "Create your account"}
          </h1>
          <p className="text-gray-600">Fill in your details to get started</p>
        </div>

        {/* Google Sign Up */}
        <div className="mb-6">
          <button
            onClick={() => {
              setLoading(true);
              register_google();
            }}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Basic Info Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="email"
                placeholder="Email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password (min. 8 characters)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Personal Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectInput
                title="Gender"
                onChange={handleGender}
                options={genderOptions}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                selectedValue={gender}
              />

              <SelectInput
                title="Country"
                onChange={handleCountry}
                options={countryOptions}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                selectedValue={country}
              />

              <input
                type="text"
                placeholder="Height (in cm)"
                value={height}
                onChange={handleHeight}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <input
                type="text"
                placeholder="Weight (in kg)"
                value={weight}
                onChange={handleWeight}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Health & Role Info */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Health & Role
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectInput
                title="Blood Group"
                onChange={handleBloodGroup}
                options={bloodGroupsOptions}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                selectedValue={bloodGroup}
              />

              <SelectInput
                title="Role"
                onChange={handleUserRole}
                options={userRoleOptions}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                selectedValue={userRole}
              />
            </div>
          </div>

          {/* Marital Status */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Marital Status
            </h3>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="maritalStatus"
                  value="married"
                  checked={maritalStatus === "married"}
                  onChange={onMaritalStatusChange}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                Married
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="maritalStatus"
                  value="unmarried"
                  checked={maritalStatus === "unmarried"}
                  onChange={onMaritalStatusChange}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                Unmarried
              </label>
            </div>
          </div>

          {/* Profile Picture */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Profile Picture
            </h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              {!image.publicId ? (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="profile-upload"
                    disabled={uploading}
                  />
                  <label htmlFor="profile-upload" className="cursor-pointer">
                    <InsertPhotoOutlinedIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2">Click to upload your profile picture</p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </label>
                  {uploading && (
                    <div className="mt-2 text-blue-600">Uploading...</div>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <img
                    src={image.secureURL}
                    alt="Profile picture"
                    className="mx-auto rounded-lg w-32 h-32 object-cover"
                  />
                  <p className="text-sm text-green-600 mt-2">
                    ✓ Image uploaded successfully
                  </p>
                  <button
                    onClick={() =>
                      setImage({
                        publicId: "",
                        width: 0,
                        height: 0,
                        secureURL: "",
                      })
                    }
                    className="text-xs text-red-500 mt-1 hover:underline"
                  >
                    Remove image
                  </button>
                </div>
              )}
            </div>

            {/* <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">

              {!image.publicId ? (
                <CldUploadWidget
                  uploadPreset="jsm_caretakr"
                  onSuccess={onUploadSuccessHandler}
                >
                  {({ open }) => (
                    <div
                      className="text-center cursor-pointer"
                      onClick={() => open()}
                    >
                      <InsertPhotoOutlinedIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <p className="text-sm text-gray-600">
                          Click to upload your profile picture
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </CldUploadWidget>
              ) : (
                <div className="text-center">
                  <CldImage
                    cloudName="dcnpnyqvb"
                    width="150"
                    height="150"
                    src={image.publicId}
                    sizes="150px"
                    alt="Profile picture"
                    className="mx-auto rounded-lg"
                  />
                  <p className="text-sm text-green-600 mt-2">
                    ✓ Image uploaded successfully
                  </p>
                </div>
              )}
            
            </div> */}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

// "use client";
// import { register, signUpGoogle } from "@/actions/user/auth";
// import { ActionButton } from "@/components/actionButton";
// import { SelectInput } from "@/components/selectInput";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useRef, useState } from "react";
// import toast from "react-hot-toast";
// import { useGoogleLogin } from "@react-oauth/google";
// import { CldImage, CldUploadWidget } from "next-cloudinary";
// import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
// import PersonIcon from "@mui/icons-material/Person";
// import EmailIcon from "@mui/icons-material/Email";
// import LockIcon from "@mui/icons-material/Lock";
// import HeightIcon from "@mui/icons-material/Height";
// import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
// import GoogleIcon from "@mui/icons-material/Google";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// const countries = [
//   "Afghanistan",
//   "Albania",
//   "Algeria",
//   "Andorra",
//   "Angola",
//   "Antigua and Barbuda",
//   "Argentina",
//   "Armenia",
//   "Australia",
//   "Austria",
//   "Azerbaijan",
//   "The Bahamas",
//   "Bahrain",
//   "Bangladesh",
//   "Barbados",
//   "Belarus",
//   "Belgium",
//   "Belize",
//   "Benin",
//   "Bhutan",
//   "Bolivia",
//   "Bosnia and Herzegovina",
//   "Botswana",
//   "Brazil",
//   "Brunei",
//   "Bulgaria",
//   "Burkina Faso",
//   "Burundi",
//   "Cabo Verde",
//   "Cambodia",
//   "Cameroon",
//   "Canada",
//   "Central African Republic",
//   "Chad",
//   "Chile",
//   "China",
//   "Colombia",
//   "Comoros",
//   "Congo, Democratic Republic of the",
//   "Congo, Republic of the",
//   "Costa Rica",
//   "Côte d'Ivoire",
//   "Croatia",
//   "Cuba",
//   "Cyprus",
//   "Czech Republic",
//   "Denmark",
//   "Djibouti",
//   "Dominica",
//   "Dominican Republic",
//   "East Timor (Timor-Leste)",
//   "Ecuador",
//   "Egypt",
//   "El Salvador",
//   "Equatorial Guinea",
//   "Eritrea",
//   "Estonia",
//   "Eswatini",
//   "Ethiopia",
//   "Fiji",
//   "Finland",
//   "France",
//   "Gabon",
//   "The Gambia",
//   "Georgia",
//   "Germany",
//   "Ghana",
//   "Greece",
//   "Grenada",
//   "Guatemala",
//   "Guinea",
//   "Guinea-Bissau",
//   "Guyana",
//   "Haiti",
//   "Honduras",
//   "Hungary",
//   "Iceland",
//   "India",
//   "Indonesia",
//   "Iran",
//   "Iraq",
//   "Ireland",
//   "Israel",
//   "Italy",
//   "Jamaica",
//   "Japan",
//   "Jordan",
//   "Kazakhstan",
//   "Kenya",
//   "Kiribati",
//   "Korea, North",
//   "Korea, South",
//   "Kosovo",
//   "Kuwait",
//   "Kyrgyzstan",
//   "Laos",
//   "Latvia",
//   "Lebanon",
//   "Lesotho",
//   "Liberia",
//   "Libya",
//   "Liechtenstein",
//   "Lithuania",
//   "Luxembourg",
//   "Madagascar",
//   "Malawi",
//   "Malaysia",
//   "Maldives",
//   "Mali",
//   "Malta",
//   "Marshall Islands",
//   "Mauritania",
//   "Mauritius",
//   "Mexico",
//   "Micronesia, Federated States of",
//   "Moldova",
//   "Monaco",
//   "Mongolia",
//   "Montenegro",
//   "Morocco",
//   "Mozambique",
//   "Myanmar (Burma)",
//   "Namibia",
//   "Nauru",
//   "Nepal",
//   "Netherlands",
//   "New Zealand",
//   "Nicaragua",
//   "Niger",
//   "Nigeria",
//   "North Macedonia",
//   "Norway",
//   "Oman",
//   "Pakistan",
//   "Palau",
//   "Panama",
//   "Papua New Guinea",
//   "Paraguay",
//   "Peru",
//   "Philippines",
//   "Poland",
//   "Portugal",
//   "Qatar",
//   "Romania",
//   "Russia",
//   "Rwanda",
//   "Saint Kitts and Nevis",
//   "Saint Lucia",
//   "Saint Vincent and the Grenadines",
//   "Samoa",
//   "San Marino",
//   "Sao Tome and Principe",
//   "Saudi Arabia",
//   "Senegal",
//   "Serbia",
//   "Seychelles",
//   "Sierra Leone",
//   "Singapore",
//   "Slovakia",
//   "Slovenia",
//   "Solomon Islands",
//   "Somalia",
//   "South Africa",
//   "Spain",
//   "Sri Lanka",
//   "Sudan",
//   "Sudan, South",
//   "Suriname",
//   "Sweden",
//   "Switzerland",
//   "Syria",
//   "Taiwan",
//   "Tajikistan",
//   "Tanzania",
//   "Thailand",
//   "Togo",
//   "Tonga",
//   "Trinidad and Tobago",
//   "Tunisia",
//   "Turkey",
//   "Turkmenistan",
//   "Tuvalu",
//   "Uganda",
//   "Ukraine",
//   "United Arab Emirates",
//   "United Kingdom",
//   "United States",
//   "Uruguay",
//   "Uzbekistan",
//   "Vanuatu",
//   "Vatican City",
//   "Venezuela",
//   "Vietnam",
//   "Yemen",
//   "Zambia",
//   "Zimbabwe",
// ];

// const countryOptions = countries.map((country) => {
//   return {
//     id: country.replace(/[^a-zA-Z]/g, "").toLowerCase(),
//     displayName: country,
//   };
// });

// const genderOptions = [
//   { id: "male", displayName: "Male" },
//   { id: "female", displayName: "Female" },
// ];

// const bloodGroupsOptions = [
//   { id: "a+", displayName: "A+" },
//   { id: "a-", displayName: "A-" },
//   { id: "b+", displayName: "B+" },
//   { id: "b-", displayName: "B-" },
//   { id: "ab+", displayName: "AB+" },
//   { id: "ab-", displayName: "AB-" },
//   { id: "o+", displayName: "O+" },
//   { id: "o-", displayName: "O-" },
// ];

// const userRoleOptions = [
//   { id: "patient", displayName: "Patient" },
//   { id: "doctor", displayName: "Doctor" },
// ];

// const SignUpPage = () => {
//   const router = useRouter();
//   const ref = useRef();

//   const [loading, setLoading] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [completedFields, setCompletedFields] = useState({});

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [gender, setGender] = useState("");
//   const [country, setCountry] = useState("");
//   const [height, setHeight] = useState("");
//   const [weight, setWeight] = useState("");
//   const [maritalStatus, setMaritalStatus] = useState("");
//   const [bloodGroup, setBloodGroup] = useState("");
//   const [userRole, setUserRole] = useState("");
//   const [filePreview, setFilePreview] = useState("");
//   const [image, setImage] = useState({
//     publicId: "",
//     width: 0,
//     height: 0,
//     secureURL: "",
//   });

//   // Track field completion for progress indication
//   const updateFieldCompletion = (field, value) => {
//     setCompletedFields((prev) => ({
//       ...prev,
//       [field]: !!value,
//     }));
//   };

//   async function handleGoogleRegistrationSuccess(tokenResponse) {
//     const accessToken = tokenResponse.access_token;
//     const { result, message } = await signUpGoogle(accessToken);
//     if (result) {
//       router.push(`/dashboard`);
//     } else {
//       toast.error(message);
//     }
//     setLoading(false);
//   }

//   const register_google = useGoogleLogin({
//     onSuccess: handleGoogleRegistrationSuccess,
//   });

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       if (
//         !username ||
//         !email ||
//         !password ||
//         !gender ||
//         !country ||
//         !height ||
//         !weight ||
//         !bloodGroup ||
//         !userRole ||
//         !maritalStatus ||
//         !image.secureURL
//       ) {
//         toast.error("Please complete all fields");
//         return;
//       }

//       var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//       if (!email.match(mailformat)) {
//         toast.error("Invalid email!");
//         return;
//       }

//       if (password.length < 8) {
//         toast.error("Password must be atleast 8 characters long");
//         return;
//       }

//       var numberFormat = /^^\d+(\.\d+)?$/;
//       if (!height.match(numberFormat) || !weight.match(numberFormat)) {
//         toast.error("Please enter valid numeric values");
//         return;
//       }

//       const { result, message } = await register({
//         name: username,
//         email,
//         password,
//         gender,
//         country,
//         height: parseInt(height),
//         weight: parseInt(weight),
//         bloodGroup,
//         userRole,
//         maritalStatus,
//         profile_pic: image.secureURL,
//       });

//       if (result) {
//         router.push("/dashboard");
//       } else {
//         toast.error(message);
//       }
//     } catch (error) {
//       console.log("Signup failed", error.message);
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGender = (value) => {
//     setGender(value);
//     updateFieldCompletion("gender", value);
//   };

//   const handleCountry = (value) => {
//     setCountry(value);
//     updateFieldCompletion("country", value);
//   };

//   const handleHeight = (e) => {
//     const value = e.target.value;
//     if (value[0] != "0") {
//       setHeight(value);
//       updateFieldCompletion("height", value);
//     } else {
//       setHeight("");
//       updateFieldCompletion("height", "");
//     }
//   };

//   const handleWeight = (e) => {
//     const value = e.target.value;
//     if (value[0] != "0") {
//       setWeight(value);
//       updateFieldCompletion("weight", value);
//     } else {
//       setWeight("");
//       updateFieldCompletion("weight", "");
//     }
//   };

//   const onMaritalStatusChange = (e) => {
//     setMaritalStatus(e.target.value);
//     updateFieldCompletion("maritalStatus", e.target.value);
//   };

//   const handleBloodGroup = (value) => {
//     setBloodGroup(value);
//     updateFieldCompletion("bloodGroup", value);
//   };

//   const handleUserRole = (value) => {
//     setUserRole(value);
//     updateFieldCompletion("userRole", value);
//   };

//   const onUploadSuccessHandler = (result) => {
//     setImage(() => ({
//       publicId: result?.info?.public_id,
//       width: result?.info?.width,
//       height: result?.info?.height,
//       secureURL: result?.info?.secure_url,
//     }));
//     updateFieldCompletion("image", result?.info?.secure_url);
//   };

//   const totalFields = 10;
//   const completedCount = Object.values(completedFields).filter(Boolean).length;
//   const progressPercentage = (completedCount / totalFields) * 100;

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute top-0 left-0 w-full h-full">
//         <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
//         <div className="absolute top-60 right-32 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-bounce"></div>
//         <div className="absolute bottom-32 left-40 w-20 h-20 bg-indigo-200 rounded-full opacity-20 animate-pulse"></div>
//       </div>

//       {/* Header */}
//       <div className="absolute left-6 top-6 z-10">
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-sm">C</span>
//             </div>
//             <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               CareTakr
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex items-center justify-center min-h-screen px-6 py-12">
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-6xl p-8 relative">
//           {/* Progress Bar */}
//           <div className="mb-8">
//             <div className="flex justify-between items-center mb-2">
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 {loading ? (
//                   <div className="flex items-center space-x-2">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                     <span>Creating Account...</span>
//                   </div>
//                 ) : (
//                   "Create Your Account"
//                 )}
//               </h2>
//               <div className="text-sm text-gray-500">
//                 {completedCount}/{totalFields} completed
//               </div>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div
//                 className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
//                 style={{ width: `${progressPercentage}%` }}
//               ></div>
//             </div>
//           </div>

//           <div className="space-y-8">
//             {/* Google Sign Up */}
//             <div className="text-center">
//               <button
//                 onClick={() => {
//                   setLoading(true);
//                   register_google();
//                 }}
//                 disabled={loading}
//                 className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <GoogleIcon className="mr-3 text-blue-500" />
//                 Continue with Google
//                 <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-200"></div>
//               </button>
//             </div>

//             {/* Divider */}
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-4 bg-white text-gray-500">
//                   Or continue with email
//                 </span>
//               </div>
//             </div>

//             {/* Form Content */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* Left Column - Personal Info */}
//               <div className="space-y-6">
//                 <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
//                   Personal Information
//                 </h3>

//                 {/* Full Name */}
//                 <div className="relative group">
//                   <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
//                   <input
//                     type="text"
//                     placeholder="Full name"
//                     className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white"
//                     value={username}
//                     onChange={(e) => {
//                       setUsername(e.target.value);
//                       updateFieldCompletion("username", e.target.value);
//                     }}
//                   />
//                   {completedFields.username && (
//                     <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
//                   )}
//                 </div>

//                 {/* Email */}
//                 <div className="relative group">
//                   <EmailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
//                   <input
//                     type="email"
//                     placeholder="Email address"
//                     className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white"
//                     value={email}
//                     onChange={(e) => {
//                       setEmail(e.target.value);
//                       updateFieldCompletion("email", e.target.value);
//                     }}
//                   />
//                   {completedFields.email && (
//                     <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
//                   )}
//                 </div>

//                 {/* Password */}
//                 <div className="relative group">
//                   <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
//                   <input
//                     type="password"
//                     placeholder="Password (min. 8 characters)"
//                     className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white"
//                     value={password}
//                     onChange={(e) => {
//                       setPassword(e.target.value);
//                       updateFieldCompletion("password", e.target.value);
//                     }}
//                   />
//                   {completedFields.password && (
//                     <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
//                   )}
//                 </div>

//                 {/* Gender & Country */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <SelectInput
//                     title="Gender"
//                     onChange={handleGender}
//                     options={genderOptions}
//                     className="bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500"
//                     selectedValue={gender}
//                   />
//                   <SelectInput
//                     title="Country"
//                     onChange={handleCountry}
//                     options={countryOptions}
//                     className="bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500"
//                     selectedValue={country}
//                   />
//                 </div>
//               </div>

//               {/* Middle Column - Health Info */}
//               <div className="space-y-6">
//                 <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
//                   Health Information
//                 </h3>

//                 {/* Height & Weight */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="relative group">
//                     <HeightIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
//                     <input
//                       type="text"
//                       placeholder="Height (cm)"
//                       value={height}
//                       onChange={handleHeight}
//                       className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white"
//                     />
//                   </div>
//                   <div className="relative group">
//                     <MonitorWeightIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
//                     <input
//                       type="text"
//                       placeholder="Weight (kg)"
//                       value={weight}
//                       onChange={handleWeight}
//                       className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white"
//                     />
//                   </div>
//                 </div>

//                 {/* Blood Group & Role */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <SelectInput
//                     title="Blood Group"
//                     onChange={handleBloodGroup}
//                     options={bloodGroupsOptions}
//                     className="bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500"
//                     selectedValue={bloodGroup}
//                   />
//                   <SelectInput
//                     title="I am a"
//                     onChange={handleUserRole}
//                     options={userRoleOptions}
//                     className="bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500"
//                     selectedValue={userRole}
//                   />
//                 </div>

//                 {/* Marital Status */}
//                 <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
//                   <h4 className="text-sm font-medium text-gray-700 mb-3">
//                     Marital Status
//                   </h4>
//                   <div className="flex space-x-6">
//                     <label className="flex items-center cursor-pointer group">
//                       <input
//                         type="radio"
//                         name="maritalStatus"
//                         value="married"
//                         checked={maritalStatus === "married"}
//                         onChange={onMaritalStatusChange}
//                         className="sr-only"
//                       />
//                       <div
//                         className={`w-4 h-4 rounded-full border-2 mr-2 transition-all duration-200 ${
//                           maritalStatus === "married"
//                             ? "border-blue-500 bg-blue-500"
//                             : "border-gray-300 group-hover:border-blue-400"
//                         }`}
//                       >
//                         {maritalStatus === "married" && (
//                           <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
//                         )}
//                       </div>
//                       <span className="text-gray-700">Married</span>
//                     </label>
//                     <label className="flex items-center cursor-pointer group">
//                       <input
//                         type="radio"
//                         name="maritalStatus"
//                         value="unmarried"
//                         checked={maritalStatus === "unmarried"}
//                         onChange={onMaritalStatusChange}
//                         className="sr-only"
//                       />
//                       <div
//                         className={`w-4 h-4 rounded-full border-2 mr-2 transition-all duration-200 ${
//                           maritalStatus === "unmarried"
//                             ? "border-blue-500 bg-blue-500"
//                             : "border-gray-300 group-hover:border-blue-400"
//                         }`}
//                       >
//                         {maritalStatus === "unmarried" && (
//                           <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
//                         )}
//                       </div>
//                       <span className="text-gray-700">Unmarried</span>
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Column - Profile Picture */}
//               <div className="space-y-6">
//                 <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
//                   Profile Picture
//                 </h3>

//                 <div className="relative">
//                   <div
//                     className={`border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
//                       image.publicId
//                         ? "border-green-300 bg-green-50"
//                         : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
//                     }`}
//                   >
//                     {!image.publicId ? (
//                       <CldUploadWidget
//                         uploadPreset="jsm_caretakr"
//                         onSuccess={onUploadSuccessHandler}
//                       >
//                         {({ open }) => (
//                           <div
//                             className="flex flex-col items-center justify-center cursor-pointer group"
//                             onClick={() => open()}
//                           >
//                             <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-200">
//                               <InsertPhotoOutlinedIcon className="text-4xl text-blue-500" />
//                             </div>
//                             <p className="text-gray-600 text-center">
//                               <span className="font-medium">
//                                 Click to upload
//                               </span>{" "}
//                               your profile picture
//                             </p>
//                             <p className="text-sm text-gray-400 mt-1">
//                               PNG, JPG up to 10MB
//                             </p>
//                           </div>
//                         )}
//                       </CldUploadWidget>
//                     ) : (
//                       <div className="relative group">
//                         <div className="overflow-hidden rounded-xl">
//                           <CldImage
//                             cloudName="dcnpnyqvb"
//                             width="300"
//                             height="300"
//                             src={image.publicId}
//                             sizes="100vw"
//                             alt="Profile picture"
//                             className="w-full h-auto"
//                           />
//                         </div>
//                         <div className="absolute top-2 right-2">
//                           <CheckCircleIcon className="text-green-500 bg-white rounded-full" />
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   onClick={handleSubmit}
//                   disabled={loading}
//                   className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//                 >
//                   {loading ? (
//                     <div className="flex items-center justify-center space-x-2">
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                       <span>Creating Account...</span>
//                     </div>
//                   ) : (
//                     "Create Account"
//                   )}
//                 </button>
//                 <div className="mt-4 text-gray-600">
//                   Already have an account?
//                   <Link
//                     href="/signin"
//                     className="ml-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
//                   >
//                     Sign in
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;

// "use client";
// import { register, signUpGoogle } from "@/actions/user/auth";
// import { ActionButton } from "@/components/actionButton";
// import { SelectInput } from "@/components/selectInput";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useRef, useState } from "react";
// import toast from "react-hot-toast";
// import { useGoogleLogin } from "@react-oauth/google";
// import { CldImage, CldUploadWidget } from "next-cloudinary";
// import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";

// const countries = [
//   "Afghanistan",
//   "Albania",
//   "Algeria",
//   "Andorra",
//   "Angola",
//   "Antigua and Barbuda",
//   "Argentina",
//   "Armenia",
//   "Australia",
//   "Austria",
//   "Azerbaijan",
//   "The Bahamas",
//   "Bahrain",
//   "Bangladesh",
//   "Barbados",
//   "Belarus",
//   "Belgium",
//   "Belize",
//   "Benin",
//   "Bhutan",
//   "Bolivia",
//   "Bosnia and Herzegovina",
//   "Botswana",
//   "Brazil",
//   "Brunei",
//   "Bulgaria",
//   "Burkina Faso",
//   "Burundi",
//   "Cabo Verde",
//   "Cambodia",
//   "Cameroon",
//   "Canada",
//   "Central African Republic",
//   "Chad",
//   "Chile",
//   "China",
//   "Colombia",
//   "Comoros",
//   "Congo, Democratic Republic of the",
//   "Congo, Republic of the",
//   "Costa Rica",
//   "Côte d’Ivoire",
//   "Croatia",
//   "Cuba",
//   "Cyprus",
//   "Czech Republic",
//   "Denmark",
//   "Djibouti",
//   "Dominica",
//   "Dominican Republic",
//   "East Timor (Timor-Leste)",
//   "Ecuador",
//   "Egypt",
//   "El Salvador",
//   "Equatorial Guinea",
//   "Eritrea",
//   "Estonia",
//   "Eswatini",
//   "Ethiopia",
//   "Fiji",
//   "Finland",
//   "France",
//   "Gabon",
//   "The Gambia",
//   "Georgia",
//   "Germany",
//   "Ghana",
//   "Greece",
//   "Grenada",
//   "Guatemala",
//   "Guinea",
//   "Guinea-Bissau",
//   "Guyana",
//   "Haiti",
//   "Honduras",
//   "Hungary",
//   "Iceland",
//   "India",
//   "Indonesia",
//   "Iran",
//   "Iraq",
//   "Ireland",
//   "Israel",
//   "Italy",
//   "Jamaica",
//   "Japan",
//   "Jordan",
//   "Kazakhstan",
//   "Kenya",
//   "Kiribati",
//   "Korea, North",
//   "Korea, South",
//   "Kosovo",
//   "Kuwait",
//   "Kyrgyzstan",
//   "Laos",
//   "Latvia",
//   "Lebanon",
//   "Lesotho",
//   "Liberia",
//   "Libya",
//   "Liechtenstein",
//   "Lithuania",
//   "Luxembourg",
//   "Madagascar",
//   "Malawi",
//   "Malaysia",
//   "Maldives",
//   "Mali",
//   "Malta",
//   "Marshall Islands",
//   "Mauritania",
//   "Mauritius",
//   "Mexico",
//   "Micronesia, Federated States of",
//   "Moldova",
//   "Monaco",
//   "Mongolia",
//   "Montenegro",
//   "Morocco",
//   "Mozambique",
//   "Myanmar (Burma)",
//   "Namibia",
//   "Nauru",
//   "Nepal",
//   "Netherlands",
//   "New Zealand",
//   "Nicaragua",
//   "Niger",
//   "Nigeria",
//   "North Macedonia",
//   "Norway",
//   "Oman",
//   "Pakistan",
//   "Palau",
//   "Panama",
//   "Papua New Guinea",
//   "Paraguay",
//   "Peru",
//   "Philippines",
//   "Poland",
//   "Portugal",
//   "Qatar",
//   "Romania",
//   "Russia",
//   "Rwanda",
//   "Saint Kitts and Nevis",
//   "Saint Lucia",
//   "Saint Vincent and the Grenadines",
//   "Samoa",
//   "San Marino",
//   "Sao Tome and Principe",
//   "Saudi Arabia",
//   "Senegal",
//   "Serbia",
//   "Seychelles",
//   "Sierra Leone",
//   "Singapore",
//   "Slovakia",
//   "Slovenia",
//   "Solomon Islands",
//   "Somalia",
//   "South Africa",
//   "Spain",
//   "Sri Lanka",
//   "Sudan",
//   "Sudan, South",
//   "Suriname",
//   "Sweden",
//   "Switzerland",
//   "Syria",
//   "Taiwan",
//   "Tajikistan",
//   "Tanzania",
//   "Thailand",
//   "Togo",
//   "Tonga",
//   "Trinidad and Tobago",
//   "Tunisia",
//   "Turkey",
//   "Turkmenistan",
//   "Tuvalu",
//   "Uganda",
//   "Ukraine",
//   "United Arab Emirates",
//   "United Kingdom",
//   "United States",
//   "Uruguay",
//   "Uzbekistan",
//   "Vanuatu",
//   "Vatican City",
//   "Venezuela",
//   "Vietnam",
//   "Yemen",
//   "Zambia",
//   "Zimbabwe",
// ];

// const countryOptions = countries.map((country) => {
//   return {
//     id: country.replace(/[^a-zA-Z]/g, "").toLowerCase(),
//     displayName: country,
//   };
// });

// const genderOptions = [
//   {
//     id: "male",
//     displayName: "Male",
//   },
//   {
//     id: "female",
//     displayName: "Female",
//   },
// ];

// const bloodGroupsOptions = [
//   {
//     id: "a+",
//     displayName: "A+",
//   },
//   {
//     id: "a-",
//     displayName: "A-",
//   },
//   {
//     id: "b+",
//     displayName: "B+",
//   },
//   {
//     id: "b-",
//     displayName: "B-",
//   },
//   {
//     id: "ab+",
//     displayName: "AB+",
//   },
//   {
//     id: "ab-",
//     displayName: "AB-",
//   },
//   {
//     id: "o+",
//     displayName: "O+",
//   },
//   {
//     id: "o-",
//     displayName: "O-",
//   },
// ];

// const userRoleOptions = [
//   {
//     id: "patient",
//     displayName: "Patient",
//   },
//   {
//     id: "doctor",
//     displayName: "Doctor",
//   },
// ];

// const SignUpPage = () => {
//   const router = useRouter();
//   const ref = useRef();

//   const [loading, setLoading] = useState(false);

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [gender, setGender] = useState("");
//   const [country, setCountry] = useState("");
//   const [height, setHeight] = useState("");
//   const [weight, setWeight] = useState("");
//   const [maritalStatus, setMaritalStatus] = useState("");
//   const [bloodGroup, setBloodGroup] = useState("");
//   const [userRole, setUserRole] = useState("");
//   const [filePreview, setFilePreview] = useState("");
//   const [image, setImage] = useState({
//     publicId: "",
//     width: 0,
//     height: 0,
//     secureURL: "",
//   });

//   async function handleGoogleRegistrationSuccess(tokenResponse) {
//     const accessToken = tokenResponse.access_token;
//     const { result, message } = await signUpGoogle(accessToken);
//     if (result) {
//       router.push(`/dashboard`);
//     } else {
//       toast.error(message);
//     }
//     setLoading(false);
//   }

//   const register_google = useGoogleLogin({
//     onSuccess: handleGoogleRegistrationSuccess,
//   });

//   const handleSubmit = async () => {
//     try {
//       // access image file using ref.current.files[0]
//       // convertToBase64 and pass to backend
//       setLoading(true);
//       if (
//         !username ||
//         !email ||
//         !password ||
//         !gender ||
//         !country ||
//         !height ||
//         !weight ||
//         !bloodGroup ||
//         !userRole ||
//         !maritalStatus ||
//         !image.secureURL
//       ) {
//         toast.error("Please complete all fields");
//       }

//       var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//       if (!email.match(mailformat)) {
//         toast.error("Invalid email!");
//         return;
//       }

//       if (password.length < 8) {
//         toast.error("Password must be atleast 8 characters long");
//         return;
//       }

//       var numberFormat = /^^\d+(\.\d+)?$/;
//       if (!height.match(numberFormat) || !weight.match(numberFormat)) {
//         /^^\d+(\.\d+)?$/;
//         toast.error("Please envter valid numeric values");
//         return;
//       }
//       const { result, message } = await register({
//         name: username,
//         email,
//         password,
//         gender,
//         country,
//         height: parseInt(height),
//         weight: parseInt(weight),
//         bloodGroup,
//         userRole,
//         maritalStatus,
//         profile_pic: image.secureURL,
//       });

//       if (result) {
//         router.push("/dashboard");
//       } else {
//         toast.error(message);
//       }
//     } catch (error) {
//       console.log("Signup failed", error.message);
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGender = (value) => {
//     console.log(value);
//     setGender(value);
//   };
//   const handleCountry = (value) => {
//     console.log(value);
//     setCountry(value);
//   };

//   const handleHeight = (e) => {
//     if (e.target.value[0] != "0") setHeight(e.target.value);
//     else setHeight("");
//   };
//   const handleWeight = (e) => {
//     // regex which allows digit from 0 to 9 with a optional decimal
//     // const regex = /^^\d+(\.\d+)?$/

//     if (e.target.value[0] != "0") setWeight(e.target.value);
//     else setWeight("");
//   };

//   const onMaritalStatusChange = (e) => {
//     setMaritalStatus(e.target.value);
//   };

//   const handleBloodGroup = (value) => {
//     console.log(value);
//     setBloodGroup(value);
//   };

//   const handleImageFile = (e) => {
//     setFilePreview(URL.createObjectURL(e.target.files[0]));
//   };

//   const handleUserRole = (value) => {
//     console.log(value);
//     setUserRole(value);
//   };

//   const onUploadSuccessHandler = (result) => {
//     console.log(result);
//     setImage(() => ({
//       publicId: result?.info?.public_id,
//       width: result?.info?.width,
//       height: result?.info?.height,
//       secureURL: result?.info?.secure_url,
//     }));
//     console.log(image);
//   };

//   return (
//     <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-blue-50">
//       <div className="absolute left-6 top-4 flex items-center ">
//         {/* <Image src="/logo.png " width={20} height={20} /> */}
//         {/* <h1>Caretakr</h1> */}
//         <span>
//           Already have an account?
//           <Link href="/signin" className="hover:text-blue-800">
//             {" "}
//             Sign in
//           </Link>
//         </span>
//       </div>
//       <div className="bg-white rounded-sm w-[60%] h-fit p-8 flex flex-col justify-center align-items ">
//         <h2 className="text-6xl mb-[3.5rem] font-bold ">
//           {loading ? "Loading..." : "Sign up"}
//         </h2>
//         <div className="flex flex-col w-[100%] justify-center items-center ">
//           <ActionButton
//             onClick={() => {
//               setLoading(true);
//               register_google();
//             }}
//             className="font-bold text-xl w-[25vw]"
//           >
//             Google
//           </ActionButton>
//           <div className="border-t-2 border-gray-500 flex flex-col gap-4 text-xl mt-[2rem] pt-[2rem] ">
//             <div className=" flex gap-6">
//               <div className="flex flex-col gap-4">
//                 {" "}
//                 <input
//                   type="text"
//                   placeholder="Full name"
//                   className="bg-transparent w-[25vw] broder-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4 bg-gray-200 "
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="bg-transparent w-[25vw] broder-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4 bg-gray-200 "
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password min. 8 characters"
//                   className="bg-transparent w-[25vw] broder-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4 bg-gray-200 "
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <div className="w-[25vw] broder-2 border-transparent flex justify-evenly items-center ">
//                   <SelectInput
//                     title="Gender"
//                     onChange={handleGender}
//                     options={genderOptions}
//                     className="w-[10vw] bg-gray-200"
//                     selectedValue={gender}
//                   />
//                   <SelectInput
//                     title="Country"
//                     onChange={handleCountry}
//                     options={countryOptions}
//                     className="w-[10vw] bg-gray-200"
//                     selectedValue={country}
//                   />
//                 </div>
//                 <div className="w-[25vw] broder-2 flex justify-evenly ">
//                   <input
//                     type="text"
//                     placeholder="Height (in cm)"
//                     value={height}
//                     onChange={(e) => handleHeight(e)}
//                     className="px-6 py-4 w-[10vw] bg-gray-200"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Weight (in kg)"
//                     value={weight}
//                     onChange={(e) => handleWeight(e)}
//                     className="px-6 py-4 w-[10vw] bg-gray-200"
//                   />
//                 </div>
//                 <div className="w-[25vw] broder-2 flex justify-evenly ">
//                   <SelectInput
//                     title="Blood Group"
//                     onChange={handleBloodGroup}
//                     options={bloodGroupsOptions}
//                     className="w-[10vw] bg-gray-200"
//                     selectedValue={bloodGroup}
//                   />
//                   <SelectInput
//                     title="Role"
//                     onChange={handleUserRole}
//                     options={userRoleOptions}
//                     className="w-[10vw] bg-gray-200"
//                     selectedValue={userRole}
//                   />
//                 </div>
//                 <div className="flex justify-evenly text-gray-400">
//                   <span className="">Married status</span>
//                   <div>
//                     <input
//                       type="radio"
//                       name="maritalStatus"
//                       value="married"
//                       id="married"
//                       checked={maritalStatus === "married"}
//                       onChange={onMaritalStatusChange}
//                       className="mr-1"
//                     />
//                     <label htmlFor="regular">Married</label>
//                   </div>
//                   <div>
//                     <input
//                       type="radio"
//                       name="maritalStatus"
//                       value="unmarried"
//                       id="unmarried"
//                       checked={maritalStatus === "unmarried"}
//                       onChange={onMaritalStatusChange}
//                       className="mr-1"
//                     />
//                     <label htmlFor="unmarried">Unmarried</label>
//                   </div>
//                 </div>
//               </div>

//               <div className="w-[15vw] mx-5 my-2 border-2 border-gray-300 rounded-md group hover:border-gray-500 flex items-center justify-center  flex-col h-fit p-5">
//                 {!image.publicId ? (
//                   <div className="flex justify-center items-center flex-col">
//                     <CldUploadWidget
//                       uploadPreset="jsm_caretakr"
//                       onSuccess={onUploadSuccessHandler}
//                     >
//                       {({ open }) => {
//                         return (
//                           <InsertPhotoOutlinedIcon
//                             fontSize="large"
//                             className="text-4xl "
//                             onClick={() => open()}
//                           />
//                         );
//                       }}
//                     </CldUploadWidget>
//                     <p className=" mt-2">Upload your image</p>
//                   </div>
//                 ) : (
//                   <div className="cursor-pointer overflow-hidden rounded-[10px] flex items-center justify-center ">
//                     <CldImage
//                       cloudName="dcnpnyqvb"
//                       width="960"
//                       height="600"
//                       src={image.publicId}
//                       sizes="100vw"
//                       alt="Description of my image"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="mt-[2rem] m-auto">
//               <ActionButton
//                 className=" font-bold uppercase text-xl w-[25vw]"
//                 onClick={handleSubmit}
//                 disabled={loading}
//               >
//                 Sign Up
//               </ActionButton>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;
