import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SignupForm = ({ values, touched, errors }) => {
    return (
        <div className="signup-form">
            <Form>
                {/* Name Field */}
               <Field
                type="text"
                name="name"
                placeholder="Enter Full Name"
                value={values.name}
                />
                {touched.name && errors.name && <p>{errors.name}</p>}

                {/* Email Field */}
                <Field
                type="text"
                name="email"
                placeholder="Enter your email"
                value={values.email}
                />
                {touched.email && errors.email && <p>{errors.email}</p>}

                {/* Password Field */}
                <Field
                type="text"
                name="password"
                placeholder="Enter your password"
                value={values.password}
                />
                {touched.password && errors.password && <p>{errors.password}</p>}

                {/* Terms of Service Checkbox */}
                <label>
                <Field
                type="checkbox"
                name="terms"
                placeholder="Terms of Service"
                unchecked={values.terms}
                />
                <p>Terms of Service</p>
                </label>


                {/* Submit Button */}
                <button type="submit">Submit</button>
            </Form>
        </div>
    );
};

const FormikSignupForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || "true"
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("What is your name?"),
        email: Yup.string().required("What is your email?"),
        password: Yup.string().required("What is your password?"),
        terms: Yup.boolean()
    }),

    handleSubmit(values) {
        axios  
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }
})(SignupForm);
console.log(FormikSignupForm);

export default FormikSignupForm;
