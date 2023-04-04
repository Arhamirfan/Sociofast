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
import LoginForm from './loginForm';
import SignUpForm from './signupForm';

const AuthenticationPage = ({ loading, type }) => {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center flex-column min-vh-100 font">

                <div className="container">
                    <Row className={styles.login}>
                        <Col xs={12} md={6} className={styles.loginImage}>
                            <img src={LoginImage.src} alt="Login" />
                        </Col>
                        <Col xs={12} md={6} className={styles.loginForm}>
                            {type == 'login' ? <LoginForm loading={loading} /> : <SignUpForm loading={loading} />}

                        </Col>
                    </Row>

                </div>
            </div>
        </>
    )
}

export default AuthenticationPage