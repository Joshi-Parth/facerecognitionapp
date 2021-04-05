import React from 'react';
import './facerecog.css'



const FaceRecognition = ({ imageUrl, box}) => {
        return(
            <div>
                <div className='center ma'>
                    <div className='absolute mt2'>
                        <img alt='' id='inputImage' src={imageUrl} width='500px' heigh='auto' />
                         {box.map((value, index) => (
                             <div className='bounding-box' key={index} style={{top: value.topRow, right: value.rightCol, bottom: value.bottomRow, left: value.leftCol}}></div>
                         ))}
                    </div>
                </div>
            </div>
        );
    }

export default FaceRecognition;