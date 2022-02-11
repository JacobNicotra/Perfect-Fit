import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { createPuzzle, addImg } from '../../store/puzzle';
import { getPuzzles, getPuzzleOne } from '../../store/puzzle';
import { useEffect } from 'react';
import "./ImageUpload.css"

const ImageUpload = ({ modalSetter }) => {
    const [errors, setErrors] = useState([]);

    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);



    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()

    const params = useParams();
    const puzzleId = params.puzzleId

    //   useEffect(() => {
    //     dispatch(getPuzzles())
    //   }, [dispatch])

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        // console.log('_____________formData', formData)
        setImageLoading(true);

        const userId = user.id
        setErrors([])

        let newImg = await dispatch(addImg(formData, puzzleId));

        dispatch(getPuzzleOne(puzzleId))


        modalSetter(true);
        return
    };

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }


    return (
        <>
            <h2 className='modal-label'>Upload an Image</h2>
            <form autoComplete="off" className='add-puzzle-form' onSubmit={onSubmit}>
                {errors.length > 0 && <div className='puz-form-erros'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                }

                <div className='LabelAndInputContainer'>
                    {/* <label className="puzzle-form-label">Image Url</label> */}


                        <input
                            type="file"
                            accept="image/*"
                            onChange={updateImage}
                            className='img-input'
                        ></input>

                </div>
                <button className='new-puzzle-submit-button' type='submit'>Submit</button>
                {(imageLoading) && <p>Loading...</p>}
            </form>
        </>
    );
};

export default ImageUpload;
