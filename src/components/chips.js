import React from 'react'

const Chips = ({ labelled, errors, touched, setFieldValue, setPlatformTags, platformTags, platformInputValue, setPlatformInputValue }) => {

    const handleDeleteTag = (tag, setFieldValue) => {
        const newTags = platformTags.filter((t) => t !== tag);
        setPlatformTags(newTags);
        setFieldValue(`${labelled}`, newTags);
    };

    const handleAddTag = (setFieldValue) => {
        if (platformInputValue.trim() !== '') {
            const newTag = platformInputValue.trim();
            const newTags = [].concat(platformTags, newTag);
            setPlatformTags(newTags);
            setPlatformInputValue('');
            setFieldValue(`${labelled}`, newTags);
        }
    };

    const handleInputChange = (event, setFieldValue) => {
        setPlatformInputValue(event.target.value);
    };

    const handleInputKeyDown = (event, setFieldValue) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddTag(setFieldValue);
        }
        if (event.key === 'Backspace' && platformInputValue === '') {
            handleDeleteTag(platformTags[platformTags.length - 1], setFieldValue);
        }
    };

    return (
        <>
            <div className="form-group py-3">
                <label htmlFor="platform" className='boldText'>{labelled}</label>

                <div className="tag-input-container">
                    {platformTags.map((tag, i) => (
                        <div key={i} className="tag">
                            <span>{tag}</span>
                            <button
                                type="button"
                                className="close"
                                onClick={() => handleDeleteTag(tag, setFieldValue)}
                            >
                                &times;
                            </button>
                        </div>
                    ))}

                    <div className="p-3"></div>
                    <input
                        type="text"
                        id={`${labelled}`}
                        name={`${labelled}`}
                        className="form-control"
                        placeholder={`Add ${labelled}`}
                        value={platformInputValue}
                        onChange={(e) => { handleInputChange(e, setFieldValue) }}
                        onKeyDown={(e) => { handleInputKeyDown(e, setFieldValue) }}
                    />
                </div>

                {touched.platform && errors.platform && (
                    <div className="invalid-feedback">{errors.platform}</div>
                )}
            </div>
        </>
    )
}

export default Chips