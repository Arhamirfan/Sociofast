import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';
import ReactTags from 'react-tag-autocomplete';
import Chips from '../chips';
const filterSchema = yup.object().shape({
    name: yup.string(),
    description: yup.string(),
    gender: yup.string(),
    followerFrom: yup.number().integer('follower from value must be an integer').min(0, 'Value should be positive'),
    followerTo: yup.number().integer('Follower to value must be an integer').min(0, 'Value should be positive'),
    doubleChecked: yup.boolean(),
    location: yup.array().of(yup.string().required()),
    profession: yup.array().of(yup.string().required()),
    category: yup.array().of(yup.string().required()),
    platform: yup.array().of(yup.string().required()),
    like: yup.array().of(yup.string().required()),
    comment: yup.array().of(yup.string().required()),
    share: yup.array().of(yup.string().required()),
    engagement: yup.array().of(yup.string().required()),
    type: yup.array().of(yup.string().required()),
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

    const [likeTags, setLikeTags] = useState([]);
    const [likeInputValue, setLikeInputValue] = useState('');

    const [commentTags, setCommentTags] = useState([]);
    const [commentInputValue, setCommentInputValue] = useState('');

    const [shareTags, setShareTags] = useState([]);
    const [shareInputValue, setShareInputValue] = useState('');

    const [engagementTags, setEngagementTags] = useState([]);
    const [engagementInputValue, setEngagementInputValue] = useState('');
    const [typeTags, setTypeTags] = useState([]);
    const [typeInputValue, setTypeInputValue] = useState('');
    let initialValues = {
        name: "",
        description: "",
        gender: "",
        followerFrom: 0,
        followerTo: 0,
        doubleChecked: false,
        location: [],
        profession: [],
        category: [],
        platform: [],
        like: [],
        comment: [],
        share: [],
        engagement: [],
        type: [],
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
                    <div className="font ">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={filterSchema}
                            onSubmit={(values, { resetForm, setSubmitting }) => {
                                console.log('filterValues:', values);
                                try {
                                    const requiredFields = ['name', 'description', 'followerFrom', 'followerTo', 'gender'];
                                    // const isEmpty = requiredFields.every((field) => !values[field]);
                                    const isEmpty = requiredFields.every((field) => {
                                        if (field === 'followerFrom' && values[field] === 0) {
                                            return false;
                                        }
                                        return !values[field];
                                    });
                                    console.log('isEmpty:', isEmpty);
                                    if (values.followerFrom < 0)
                                        if (isEmpty) {
                                            if (values.location.length == 0 &&
                                                values.platform.length == 0 &&
                                                values.profession.length == 0 &&
                                                values.category.length == 0 &&
                                                values.like.length == 0 &&
                                                values.comment.length == 0 &&
                                                values.share.length == 0) {
                                                throw new Error('At least provide one field');
                                            }
                                        }

                                    const params = new URLSearchParams();
                                    if (values.name) {
                                        params.append('name', values.name);
                                    }
                                    if (values.description) {
                                        params.append('description', values.description);
                                    }
                                    if (values.gender) {
                                        params.append('gender', values.gender);
                                    }
                                    if (values.doubleChecked) {
                                        params.append('doubleChecked', values.doubleChecked);
                                    }
                                    if (typeof values.followerFrom == "number" && typeof values.followerTo == "number") {
                                        if (values.followerFrom > values.followerTo) {
                                            throw new Error('Follower To value must be less than follower from value');
                                        } else if (values.followerTo < values.followerFrom) {
                                            throw new Error('Follower To value must be greater than follower from value');
                                        }
                                        const followersValue = `${values.followerFrom},${values.followerTo}`;
                                        params.append('follower', followersValue);
                                    }
                                    if (values.category.length > 0) {
                                        values.category.forEach(value => {
                                            params.append('category', value);
                                        });
                                    }
                                    if (values.location.length > 0) {
                                        values.location.forEach(value => {
                                            params.append('location', value);
                                        });

                                    }
                                    if (values.platform.length > 0) {
                                        values.platform.forEach(value => {
                                            params.append('platform', value);
                                        });
                                    }
                                    if (values.profession.length > 0) {
                                        values.profession.forEach(value => {
                                            params.append('profession', value);
                                        });
                                    }
                                    if (values.like.length > 0) {
                                        values.like.forEach(value => {
                                            params.append('like', value);
                                        });
                                    }
                                    if (values.comment.length > 0) {
                                        values.comment.forEach(value => {
                                            params.append('comment', value);
                                        });
                                    }
                                    if (values.share.length > 0) {
                                        values.share.forEach(value => {
                                            params.append('share', value);
                                        });
                                    }
                                    if (values.engagement.length > 0) {
                                        values.engagement.forEach(value => {
                                            params.append('engagement', value);
                                        });
                                    }
                                    if (values.type.length > 0) {
                                        values.type.forEach(value => {
                                            params.append('type', value);
                                        });
                                    }
                                    let queryString = params.toString().replace('%2C', ',');
                                    let query = '?' + queryString;
                                    props.setShowFilterModal(false);
                                    setProfessionTags([]);
                                    setCategoryTags([]);
                                    setLocationTags([]);
                                    setPlatformTags([]);
                                    setLikeTags([]);
                                    setCommentTags([]);
                                    setShareTags([]);
                                    setEngagementTags([]);
                                    setTypeTags([]);
                                    props.setColumnRemovedData([]);
                                    props.getInfluencerCount(query);
                                    resetForm();
                                } catch (error) {
                                    toast.error(error.message);
                                }
                            }}
                        >
                            {({ values, handleSubmit, handleChange, errors, touched, setFieldValue }) => (
                                <Form>
                                    {/* {JSON.stringify(values)} */}
                                    <div className="scrolling">
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
                                        <div className='row'>
                                            <div className="col-12">
                                                <div className="form-floating my-3">
                                                    <input type="text"
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        id="description"
                                                        name="description"
                                                        value={values.description}
                                                        placeholder="This is description." />
                                                    <label htmlFor="floatingInput">description</label>
                                                    <ErrorMessage component="small" name="description" className="text-danger " />
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
                                        {/* <div className='row'>
                                        <div className="col-12">
                                            <div className="form-floating my-3">
                                                <input type="text"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    id="gender"
                                                    name="gender"
                                                    value={values.gender}
                                                    placeholder="Male" />
                                                <label htmlFor="floatingInput">gender</label>
                                                <ErrorMessage component="small" name="gender" className="text-danger " />
                                            </div>
                                        </div>
                                    </div> */}
                                        <div className='row'>
                                            <div className="col-12">
                                                <div className="form-floating my-3">
                                                    <select
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        id="gender"
                                                        name="gender"
                                                        value={values.gender}
                                                    >
                                                        <option value="">Select gender</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                    </select>
                                                    <label htmlFor="gender">Gender</label>
                                                    <ErrorMessage component="small" name="gender" className="text-danger" />
                                                </div>
                                            </div>
                                        </div>

                                        <Chips labelled={"location"} errors={errors} touched={touched} setFieldValue={setFieldValue} setPlatformTags={setLocationTags} platformTags={locationTags} platformInputValue={locationInputValue} setPlatformInputValue={setLocationInputValue} />
                                        <Chips labelled={"platform"} errors={errors} touched={touched} setFieldValue={setFieldValue} setPlatformTags={setPlatformTags} platformTags={platformTags} platformInputValue={platformInputValue} setPlatformInputValue={setPlatformInputValue} />

                                        <Chips labelled={"profession"} errors={errors} touched={touched} setFieldValue={setFieldValue} setPlatformTags={setProfessionTags} platformTags={professionTags} platformInputValue={professionInputValue} setPlatformInputValue={setProfessionInputValue} />
                                        <Chips labelled={"category"} errors={errors} touched={touched} setFieldValue={setFieldValue} setPlatformTags={setCategoryTags} platformTags={categoryTags} platformInputValue={categoryInputValue} setPlatformInputValue={setCategoryInputValue} />

                                        <Chips labelled={"like"} errors={errors} touched={touched} setFieldValue={setFieldValue} setPlatformTags={setLikeTags} platformTags={likeTags} platformInputValue={likeInputValue} setPlatformInputValue={setLikeInputValue} />
                                        <Chips labelled={"comment"} errors={errors} touched={touched} setFieldValue={setFieldValue} setPlatformTags={setCommentTags} platformTags={commentTags} platformInputValue={commentInputValue} setPlatformInputValue={setCommentInputValue} />
                                        <Chips labelled={"share"} errors={errors} touched={touched} setFieldValue={setFieldValue} setPlatformTags={setShareTags} platformTags={shareTags} platformInputValue={shareInputValue} setPlatformInputValue={setShareInputValue} />

                                        <Chips labelled={"engagement"} errors={errors} touched={touched} setFieldValue={setFieldValue} setPlatformTags={setEngagementTags} platformTags={engagementTags} platformInputValue={engagementInputValue} setPlatformInputValue={setEngagementInputValue} />
                                        <Chips labelled={"type"} errors={errors} touched={touched} setFieldValue={setFieldValue} setPlatformTags={setTypeTags} platformTags={typeTags} platformInputValue={typeInputValue} setPlatformInputValue={setTypeInputValue} />
                                        <div className="col-12">
                                            <div className="form-check my-3">
                                                <input type="checkbox"
                                                    onChange={handleChange}
                                                    className="form-check-input"
                                                    id="doubleChecked"
                                                    name="doubleChecked"
                                                    checked={values.doubleChecked} />
                                                <label htmlFor="doubleChecked" className="form-check-label">Double checked</label>
                                                <ErrorMessage component="small" name="doubleChecked" className="text-danger" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row-reverse my-3 me-2">
                                        <button type="submit" className="btn btn-primary">
                                            Apply&nbsp;filter
                                        </button>
                                    </div>
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