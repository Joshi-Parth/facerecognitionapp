import React from 'react';
import './imagelinkform.css'



const ImageLinkForm = ({ onInputChange, onSubmitButton }) => {
    return(
        <div>
            <p className='f3'>
                {'Enter image link to detect faces in your pictures!'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-4'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmitButton}>Detect</button>
                </div>
            </div>
        </div>
        
        
    );
}

export default ImageLinkForm;