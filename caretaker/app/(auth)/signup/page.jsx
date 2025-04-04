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
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";

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
  "Côte d’Ivoire",
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
  {
    id: "male",
    displayName: "Male",
  },
  {
    id: "female",
    displayName: "Female",
  },
];

const bloodGroupsOptions = [
  {
    id: "a+",
    displayName: "A+",
  },
  {
    id: "a-",
    displayName: "A-",
  },
  {
    id: "b+",
    displayName: "B+",
  },
  {
    id: "b-",
    displayName: "B-",
  },
  {
    id: "ab+",
    displayName: "AB+",
  },
  {
    id: "ab-",
    displayName: "AB-",
  },
  {
    id: "o+",
    displayName: "O+",
  },
  {
    id: "o-",
    displayName: "O-",
  },
];

const userRoleOptions = [
  {
    id: "patient",
    displayName: "Patient",
  },
  {
    id: "doctor",
    displayName: "Doctor",
  },
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
      // access image file using ref.current.files[0]
      // convertToBase64 and pass to backend
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
        /^^\d+(\.\d+)?$/;
        toast.error("Please envter valid numeric values");
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
    console.log(value);
    setGender(value);
  };
  const handleCountry = (value) => {
    console.log(value);
    setCountry(value);
  };

  const handleHeight = (e) => {
    if (e.target.value[0] != "0") setHeight(e.target.value);
    else setHeight("");
  };
  const handleWeight = (e) => {
    // regex which allows digit from 0 to 9 with a optional decimal
    // const regex = /^^\d+(\.\d+)?$/

    if (e.target.value[0] != "0") setWeight(e.target.value);
    else setWeight("");
  };

  const onMaritalStatusChange = (e) => {
    setMaritalStatus(e.target.value);
  };

  const handleBloodGroup = (value) => {
    console.log(value);
    setBloodGroup(value);
  };

  const handleImageFile = (e) => {
    setFilePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUserRole = (value) => {
    console.log(value);
    setUserRole(value);
  };

  const onUploadSuccessHandler = (result) => {
    console.log(result);
    setImage(() => ({
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url,
    }));
    console.log(image);
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-blue-50">
      <div className="absolute left-6 top-4 flex items-center ">
        {/* <Image src="/logo.png " width={20} height={20} /> */}
        {/* <h1>Caretakr</h1> */}
        <span>
          Already have an account?
          <Link href="/signin" className="hover:text-blue-800">
            {" "}
            Sign in
          </Link>
        </span>
      </div>
      <div className="bg-white rounded-sm w-[60%] h-fit p-8 flex flex-col justify-center align-items ">
        <h2 className="text-6xl mb-[3.5rem] font-bold ">
          {loading ? "Loading..." : "Sign up"}
        </h2>
        <div className="flex flex-col w-[100%] justify-center items-center ">
          <ActionButton
            onClick={() => {
              setLoading(true);
              register_google();
            }}
            className="font-bold text-xl w-[25vw]"
          >
            Google
          </ActionButton>
          <div className="border-t-2 border-gray-500 flex flex-col gap-4 text-xl mt-[2rem] pt-[2rem] ">
            <div className=" flex gap-6">
              <div className="flex flex-col gap-4">
                {" "}
                <input
                  type="text"
                  placeholder="Full name"
                  className="bg-transparent w-[25vw] broder-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4 bg-gray-200 "
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-transparent w-[25vw] broder-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4 bg-gray-200 "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password min. 8 characters"
                  className="bg-transparent w-[25vw] broder-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4 bg-gray-200 "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="w-[25vw] broder-2 border-transparent flex justify-evenly items-center ">
                  <SelectInput
                    title="Gender"
                    onChange={handleGender}
                    options={genderOptions}
                    className="w-[10vw] bg-gray-200"
                    selectedValue={gender}
                  />
                  <SelectInput
                    title="Country"
                    onChange={handleCountry}
                    options={countryOptions}
                    className="w-[10vw] bg-gray-200"
                    selectedValue={country}
                  />
                </div>
                <div className="w-[25vw] broder-2 flex justify-evenly ">
                  <input
                    type="text"
                    placeholder="Height (in cm)"
                    value={height}
                    onChange={(e) => handleHeight(e)}
                    className="px-6 py-4 w-[10vw] bg-gray-200"
                  />
                  <input
                    type="text"
                    placeholder="Weight (in kg)"
                    value={weight}
                    onChange={(e) => handleWeight(e)}
                    className="px-6 py-4 w-[10vw] bg-gray-200"
                  />
                </div>
                <div className="w-[25vw] broder-2 flex justify-evenly ">
                  <SelectInput
                    title="Blood Group"
                    onChange={handleBloodGroup}
                    options={bloodGroupsOptions}
                    className="w-[10vw] bg-gray-200"
                    selectedValue={bloodGroup}
                  />
                  <SelectInput
                    title="Role"
                    onChange={handleUserRole}
                    options={userRoleOptions}
                    className="w-[10vw] bg-gray-200"
                    selectedValue={userRole}
                  />
                </div>
                <div className="flex justify-evenly text-gray-400">
                  <span className="">Married status</span>
                  <div>
                    <input
                      type="radio"
                      name="maritalStatus"
                      value="married"
                      id="married"
                      checked={maritalStatus === "married"}
                      onChange={onMaritalStatusChange}
                      className="mr-1"
                    />
                    <label htmlFor="regular">Married</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="maritalStatus"
                      value="unmarried"
                      id="unmarried"
                      checked={maritalStatus === "unmarried"}
                      onChange={onMaritalStatusChange}
                      className="mr-1"
                    />
                    <label htmlFor="unmarried">Unmarried</label>
                  </div>
                </div>
              </div>

              <div className="w-[15vw] mx-5 my-2 border-2 border-gray-300 rounded-md group hover:border-gray-500 flex items-center justify-center  flex-col h-fit p-5">
                {!image.publicId ? (
                  <div className="flex justify-center items-center flex-col">
                    <CldUploadWidget
                      uploadPreset="jsm_caretakr"
                      onSuccess={onUploadSuccessHandler}
                    >
                      {({ open }) => {
                        return (
                          <InsertPhotoOutlinedIcon
                            fontSize="large"
                            className="text-4xl "
                            onClick={() => open()}
                          />
                        );
                      }}
                    </CldUploadWidget>
                    <p className=" mt-2">Upload your image</p>
                  </div>
                ) : (
                  <div className="cursor-pointer overflow-hidden rounded-[10px] flex items-center justify-center ">
                    <CldImage
                      cloudName="dcnpnyqvb"
                      width="960"
                      height="600"
                      src={image.publicId}
                      sizes="100vw"
                      alt="Description of my image"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-[2rem] m-auto">
              <ActionButton
                className=" font-bold uppercase text-xl w-[25vw]"
                onClick={handleSubmit}
                disabled={loading}
              >
                Sign Up
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
