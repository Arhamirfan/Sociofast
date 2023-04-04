import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import routePaths from '@/src/routes/path';
import Spinner from '../../../src/components/spinner';
import { toast } from 'react-hot-toast';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});
const LoginForm = ({ loading }) => {
    const router = useRouter();
    return (
        <>
            <div className='fullBlockLoginForm'>
                <h2 className='text-center'>Influencer Login</h2>
                {!loading ? <>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={(values) => {
                            console.log(values);
                            localStorage.setItem("email", values.email);
                            toast.success('Successfully logged in');
                            setTimeout(() => {
                                router.replace(routePaths.home)
                            }, 2000);
                        }}
                    >
                        {({ values, handleSubmit, errors, touched }) => (
                            <Form>
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
                                <button type="submit" className="btn btn-primary w-100 mt-3 mt-md-4">Submit </button>
                                <button type="button" className="btn btn-danger w-100 mt-2" onClick={() => router.push(routePaths.signUp)}>create an account?</button>
                            </Form>
                        )}
                    </Formik>
                </> : <><Spinner /></>}
            </div>
        </>
    )
}

export default LoginForm