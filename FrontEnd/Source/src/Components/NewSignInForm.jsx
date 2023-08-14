import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { registerUserApi } from "../api/loginAndVerify.Api";
import { HiUserPlus } from "react-icons/hi2";
import { RxCrossCircled } from "react-icons/rx";

const NewSignInForm = ({ setError, error }) => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState();
  const [error2, setError2] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    pin: "",
    address: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .matches(/^([^0-9]*)$/, "Name should not contain numbers")
      .min(3)
      .max(20),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^[0-9]+$/, "Phone must contain only numbers")
      .min(10)
      .max(10),
    password: Yup.string()
      .required("Password is required")
      .min(8)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!.%*?&])[A-Za-z\d@$!%*.?&]{8,}$/,
        `Password must contain at least one uppercase letter, one lowercase letter, one number and one special character`
      ),
    pin: Yup.string()
      .required("Payment Pin is required")
      .matches(/^[0-9]+$/, "Payment Pin must contain only numbers")
      .min(4)
      .max(4),
    address: Yup.string()
      .required("Address is required")
      .matches(/(?!^\d+$)^.+$/, "Address can't be only numbers"),
  });

  const handleSubmit = (values) => {
    if (profilePic) {
      registerUserApi(values, profilePic, navigate, setError);
    } else {
      setError2(true);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 undefined"
          >
            Name
          </label>
          <Field
            type="text"
            name="name"
            className="block w-full p-2 mt-1 border border-gray-500 rounded-md "
          />
          <ErrorMessage name="name" component="div" className="text-red-500" />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 undefined"
          >
            Email
          </label>
          <Field
            type="email"
            name="email"
            className="block w-full p-2 mt-1 border border-gray-500 rounded-md "
          />
          <ErrorMessage name="email" component="div" className="text-red-500" />
        </div>
        <div>
          <p className="block text-sm font-medium text-gray-700 undefined">
            Profile Picture
          </p>
          {!profilePic && (
            <label htmlFor="profilePic">
              <div className="text-center border-dashed border-2 cursor-pointer border-black w-full">
                <HiUserPlus className="mx-auto" size={40} />
                <p className="text-center text-slate-700 hidden md:block">
                  Drag & Drop or{" "}
                  <span className="text-blue-800">Choose file</span> to upload
                </p>
                <p className="text-center text-sm my-1 text-gray-500">
                  JPEG or PNG or WEBP
                </p>
              </div>
              <input
                type="file"
                onChange={(e) => {
                  setProfilePic(e.target.files[0]);
                  setError2();
                }}
                className="hidden"
                id="profilePic"
                accept="image/*"
              />
            </label>
          )}
          {profilePic && (
            <div className=" relative p-1">
              <img
                src={URL.createObjectURL(profilePic)}
                className="w-36 border border-black rounded-md "
              />
              <RxCrossCircled
                style={{ backgroundColor: "gray ", borderRadius: "100%" }}
                className="absolute top-0 left-[8.5rem]"
                size={20}
                onClick={() => setProfilePic()}
              />
            </div>
          )}
        </div>
        {error2 && (
          <span className="text-red-500">{"Profile picture required"}</span>
        )}

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 undefined"
          >
            Phone
          </label>
          <Field
            type="tel"
            name="phone"
            className="block w-full p-2 mt-1 border border-gray-500 rounded-md "
          />
          <ErrorMessage name="phone" component="div" className="text-red-500" />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 undefined"
          >
            Password
          </label>
          <Field
            type="password"
            name="password"
            className="block w-full p-2 mt-1 border border-gray-500 rounded-md "
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500"
          />
        </div>
        <div>
          <label
            htmlFor="pin"
            className="block text-sm font-medium text-gray-700 undefined"
          >
            Payment Pin
          </label>
          <Field
            type="password"
            name="pin"
            className="block w-full p-2 mt-1 border border-gray-500 rounded-md "
          />
          <ErrorMessage name="pin" component="div" className="text-red-500" />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 undefined"
          >
            Address
          </label>
          <Field
            type="text"
            name="address"
            className="block w-full p-2 mt-1 border border-gray-500 rounded-md "
          />
          <ErrorMessage
            name="address"
            component="div"
            className="text-red-500"
          />
        </div>
        {error?.response.status == 400 ? (
          <span className="text-red-500">{error.response.data.message}</span>
        ) : (
          ""
        )}

        <div className="flex items-center mt-4">
          <button
            type="submit"
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-800 rounded-md hover:bg-blue-800 focus:outline-none focus:bg-blue-800"
          >
            Register
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NewSignInForm;
