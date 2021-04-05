import React, { Component } from 'react';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo'
import ImageLinkForm from './components/ImageLinkForm/imagelinkform';
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/facerecognition';
import Signin from './components/SignIn/SignIn';
import Register from './components/Register/register';
import './App.css';
import Particles from 'react-particles-js';








const particlesOptions = {
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
      input: '',
      imageUrl: '',
      box: [],
      route: 'signin',
      isSignedIn: false,
      user : {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}
    

class App extends Component{
  constructor() {
    super();
    this.state = initialState;
  }


  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }




  calculateFaceLocation = (data) => {
    const clarifaiface = data.region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiface.left_col * width,
      topRow: clarifaiface.top_row * height,
      rightCol: width - (clarifaiface.right_col * width),
      bottomRow: height - (clarifaiface.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box:box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }


  onSubmitButton = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://protected-crag-36576.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        //update rank
        if(response){
          fetch('https://protected-crag-36576.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          }).then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user,{entries: count}))
            })
            .catch(console.log);
        }
        const faces = response.outputs[0].data.regions;
        const numOfFaces = faces.length;
        let array = []
        for(let i=0; i < numOfFaces; i++){
          array.push(this.calculateFaceLocation(faces[i]));
        }
        
         this.displayFaceBox(array);
      })
      .catch(err => console.log(err))
  }


  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState(initialState)
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  

  render() {
   const { isSignedIn, imageUrl, route, box } = this.state;
    return(
      <div className="App">
        <Particles className='particles'
          params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ?  <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onSubmitButton={this.onSubmitButton} />
              <FaceRecognition box={box} imageUrl={imageUrl}/> 
            </div>
          : (
            route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            ) 
        }
      </div>
    );
  }
}

export default App;
