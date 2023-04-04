import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import routePaths from '@/src/routes/path';
import styles from '../../../styles/Login.module.css';
import Spinner from '../../../src/components/spinner';
import LoginImage from "../../../public/assets/images/login.jpg"
import Icon from "../../../public/assets/images/sociofast.ico"
import { toast } from 'react-hot-toast';

const LoginSchema = Yup.object().shape({
    name: Yup.string().required('Password is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});
const SignUpForm = ({ loading }) => {
    const router = useRouter();
    return (
        <>
            <div className='fullBlockLoginForm'>
                <h2 className='text-center'>Influencer Sign up</h2>
                {!loading ? <>
                    <Formik
                        initialValues={{ name: '', email: '', password: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={(values) => {
                            console.log(values);
                            toast.success('Successfully signed up');
                            setTimeout(() => {
                                router.replace(routePaths.login)
                            }, 2000);
                        }}
                    >
                        {({ values, handleSubmit, errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="email">Full Name</label>
                                    <Field type="name" name="name" className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`} />
                                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <Field type="email" name="email" className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field type="password" name="password" className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`} />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                </div>
                                <button type="submit" className="btn btn-primary w-100 mt-3 mt-md-4">Sign up</button>
                                <button type="button" className="btn btn-danger w-100 mt-2" onClick={() => router.push(routePaths.login)}>Already have an account?</button>
                            </Form>
                        )}
                    </Formik>
                </> : <><Spinner /></>}
            </div>
        </>
    )
}

export default SignUpForm