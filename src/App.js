
import './App.css';
import { Auth } from './Firebase/Auth';
import {db, auth, storage} from './Firebase/FirebaseLearning';
import {useEffect, useState} from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import {ref, uploadBytes} from 'firebase/storage';
//getDocs: getting all data from that
function App() {
  const [movieList, setMovieList] = useState([]);
  const movesCollectionRef = collection(db, "Data");
  const [updatedTitle, setUpdatedTitle] = useState("");
  //New Movie State
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(true);
  const [fileUpload, setFileUpload] = useState(null);
  const getMovieList = async() => {
    //READ THE DATA
    //SET THE MOVIE LIST
    try{
      const data = await getDocs(movesCollectionRef);
      const filteredData = data.docs.map((doc)=>({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);

      //We use collection(db, "key") to get the data from the firestore
    }catch(err){
      console.error(err);
    }
  }
  const deleteMovie = async (id)=>{
    const movieDoc = doc(db, "Data", id);
    await deleteDoc(movieDoc);
    
    getMovieList();
  }
  useEffect(()=>{
    getMovieList();
  }, []);
  const onSubmitMovie = async ()=>{
    try{
      await addDoc(movesCollectionRef, {
        title: newMovieTitle, 
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid
      });//The id will be automatically generated.
      getMovieList();
    }catch(err){
      console.error(err);
    }
  }
  const updateMovieTitle = async(id)=>{
    const movieDoc = doc(db, "Data", id);
    await updateDoc(movieDoc, {title: updatedTitle});

    getMovieList(); 
  }
  const uploadFile = async ()=>{
    if(!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
      
    try{
      await uploadBytes(filesFolderRef, fileUpload);
    }catch(err){
      console.error(err);
    }
  }
  return (
    <div className="App">
      <Auth/>
      <div>
        <input placeholder="Movie title..." onChange={(e)=>setNewMovieTitle(e.target.value)}/>
        <input placeholder='Release Data...' type = "number" onChange={(e)=>setNewReleaseDate(Number(e.target.value))}/>
        <input type = 'checkbox' checked={isNewMovieOscar} onChange={(e)=>setIsNewMovieOscar(e.target.checked)}/>
        {/* We confirm the state when getting checked with the variable */}
        <label> received An Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
        
      </div>
      <div>
        {movieList.map((movie)=>(
          <div>
            <h1 style={{color: movie.receivedAnOscar ? "green": "red"}}>{movie.title}</h1>
            <p>Data: {movie.releaseDate}</p>
            <button onClick={()=>deleteMovie(movie.id)}>Delete Movie</button>
            <input onChange={(e)=>setUpdatedTitle(e.target.value)} placeholder='new title...'></input>
            <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>
      <div>
        <input type = "file" onChange={(e)=>setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
