import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';
import ReactTags from 'react-tag-autocomplete';
import Chips from '../chips';
const filterSchema = yup.object().shape({
    name: yup.string(),
    followerFrom: yup.number().integer('follower from value must be an integer').moreThan(0, 'Value should be positive'),
    followerTo: yup.number().integer('Follower to value must be an integer').moreThan(0, 'Value should be positive'),
    location: yup.array().of(yup.string().required()),
    profession: yup.array().of(yup.string().required()),
    category: yup.array().of(yup.string().required()),
    platform: yup.array().of(yup.string().required()),
});

const TableDataFilter = (props) => {
    const [locationTags, setLocationTags] = useState([]);
    const [locationInputValue, setLocationInputValue] = useState('');
    const [professionTags, setProfessionTags] = useState([]);
    const [professionInputValue, setProfessionInputValue] = useState('');
    const [categoryTags, setCategoryTags] = useState([]);
    const [categoryInputValue, setCategoryInputValue] = useState('');
    const [platformTags, setPlatformTags] = useState([]);
    const [platformInputValue, setPlatformInputValue] = useState('');
    let initialValues = {
        name: "",
        followerFrom: 0,
        followerTo: 0,
        location: [],
        profession: [],
        category: [],
        platform: [],
    };




    return (
        <>
            <Modal
                {...props}
                size="lg" className="font"
                aria-labelledby="contained-modal-title-vcenter" backdrop="static" keyboard={false}
            >
                <Modal.Header closeButton >
                    <Modal.Title >Filter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="font">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={filterSchema}
                            onSubmit={(values, { resetForm, setSubmitting }) => {
                                console.log('filterValues:', values);
                                try {
                                    const requiredFields = ['name', 'followerFrom', 'followerTo'];
                                    const isEmpty = requiredFields.every((field) => !values[field]);
                                    console.log('isEmpty:', isEmpty);
                                    if (isEmpty) {
                                        if (values.location.length == 0 && values.platform.length == 0 && values.profession.length == 0 && values.category.length == 0) {
                                            throw new Error('At least provide one field');
                                        }
                                    }

                                    const params = new URLSearchParams();
                                    if (values.name) {
                                        params.append('name', values.name);
                                    }
                                    if (values.followerFrom && values.followerTo) {
                                        if (values.followerFrom > values.followerTo) {
                                            throw new Error('Follower To value must be less than follower from value');
                                        } else if (values.followerTo < values.followerFrom) {
                                            throw new Error('Follower To value must be greater than follower from value');
                                        }
                                        const followersValue = `${values.followerFrom},${values.followerTo}`;
                                        params.append('followers', followersValue);
                                    }
                                    let queryString = params.toString().replace('%2C', ',');
                                    let query = '?' + queryString;
                                    console.log("🚀 TableDataFilter ~ queryString:", query)
                                    props.setShowFilterModal(false);
                                    setProfessionTags([]);
                                    setCategoryTags([]);
                                    setLocationTags([]);
                                    setPlatformTags([]);
                                    props.getInfluencerCount(query);
                                    resetForm();
                                } catch (error) {
                                    console.log("🚀 ~ file: tableDataFilter.js:60 ~ TableDataFilter ~ error:", error.message)
                                    toast.error(error.message);
                                }
                            }}
                        >
                            {({ values, handleSubmit, handleChange, errors, touched, setFieldValue }) => (
                                <Form>
                                    {/* {JSON.stringify(values)} */}
                                    <div className='row'>
                                        <div className="col-12">
                                            <div className="form-floating my-3">
                                                <input type="text"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    value={values.name}
                                                    placeholder="John Doe" />
                                                <label htmlFor="floatingInput">Name</label>
                                                <ErrorMessage component="small" name="name" className="text-danger " />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row '>
                                        <div className="col-6">
                                            <div className="form-floating my-3">
                                                <input type="number"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    id="followerFrom"
                                                    name="followerFrom"
                                                    value={values.followerFrom}
                                                    placeholder="0" />
                                                <label htmlFor="floatingInput">followerFrom</label>
                                                <ErrorMessage component="small" name="followerFrom" className="text-danger " />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-floating my-3">
                                                <input type="number"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    id="followerTo"
                                                    name="followerTo"
                                                    value={values.followerTo}
                                                    placeholder="100" />
                                                <label htmlFor="floatingInput">followerTo</label>
                                                <ErrorMessage component="small" name="followerTo" className="text-danger " />
                                            </div>
                                        </div>
                                    </div>
                                    <Chips labelled={"location"} errors={errors} touched={touched} setFieldValue={setFieldValue} setPlatformTags={setLocationTags} platformTags={locationTags} platformInputValue={locationInputValue} setPlatformInputValue={setLocationInputValue} />
                                    <Chips labelled={"platform"} errors={errors} touched={touched} setFieldValue={setFieldValue} setPlatformTags={setPlatformTags} platformTags={platformTags} platformInputValue={platformInputValue} setPlatformInputValue={setPlatformInputValue} />

                                    <Chips labelled={"profession"} errors={errors} touched={touched} setFieldValue={setFieldValue} setPlatformTags={setProfessionTags} platformTags={professionTags} platformInputValue={professionInputValue} setPlatformInputValue={setProfessionInputValue} />
                                    <Chips labelled={"category"} errors={errors} touched={touched} setFieldValue={setFieldValue} setPlatformTags={setCategoryTags} platformTags={categoryTags} platformInputValue={categoryInputValue} setPlatformInputValue={setCategoryInputValue} />

                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default TableDataFilter