import React,  { useState, useEffect } from 'react';
import axios from 'axios';

import { useQuery } from 'react-query';

import BookmarkIcon from './asd'

import { Link } from 'react-router-dom';


const Weather = () => {

  async function getUser() {
    try {
        const response = await axios.get('');

        return response.data
    } catch (error) {
        console.error(error);
    };
};

  const { isLoading, error, isFetching, isFetched, data } = useQuery(['repoData'], getUser,
  {
    keepPreviousData: true, // enable to keep the previous data
  }
  )
  const [postdata, setPostdata] = useState(null)
  const [all, setall] = useState(true);
  const [quos, setquos] = useState(false);
  const [qui, setqui] = useState(false);
  const [et, setet] = useState(false);

  useEffect(()=>{
    console.log('Loading')
    if ( !postdata ){
      setPostdata(data);
    }else{
      const newpostdata = [...postdata]
      console.log(data)
      const a =newpostdata.concat(data)
      setPostdata(a)
    }
  },[data])
  
  
    if (isLoading) return 'Loading...'
     
    if (error) return 'An error has occurred: ' + error.message



    if(quos){
      const newQuos = [...postdata]
      console.log(newQuos)
      const xx = newQuos.filter(item=> item.title.includes('quos'))
      setPostdata(xx)
    }
    const id = 123; // or use some other value to identify the content
       return (
         <div>
            
        
            <Link to={`/modal/${1}`}>Open Modal</Link>
            <Link to={`/modal/${2}`}>Open Modal</Link>
            <Link to={`/modal/${3}`}>Open Modal</Link>
    
          <BookmarkIcon/>
            <button onClick={()=>{
              setall(!all)
              }}>all </button>
            <button onClick={()=>{
              setquos(!quos)
            }}>quos</button>
            <button onClick={()=>{
              setqui(!qui)
            }}>qui</button>
            <button onClick={()=>{
              setet(!et)
            }}>et</button>
            { /* postdata.length !==0 && */ postdata?.map((item)=> {
                return( <div key={item.id}> {item.title} </div> )
            })} 
            {isFetching && <div>로딩중</div>}
            {isFetched && <div>로   딩  중</div>}
             <button onClick={(e)=>{
              e.preventDefault
              setNum(num+1)
              console.log(isFetching)
              console.log(isFetched)
                      
/*               if (postdata.length === 0){
                setPostdata(response.data);
              }else if(isFetched){
                const newpostdata = [...postdata]
                console.log(data)
                const a =newpostdata.concat(data)
                setPostdata(a)
              } */
              }}>

              데이터 추가
             </button>
         </div>
    );
}

export default Weather 