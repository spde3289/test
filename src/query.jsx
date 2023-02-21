import React, {useState} from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';


const Weather = () => {

  const [num,setNum] = useState(1)
 
    const { isLoading, error, isFetching, data } = useQuery(['repoData',num], ()=> 
      axios.get('https://jsonplaceholder.typicode.com/photos?albumId='+num).then(res => res.data),
      {
        keepPreviousData: true, // enable to keep the previous data
      }
    )

    
    console.log(isLoading,error,isFetching,data)

    
    if (isLoading) return 'Loading...'
     
    if (error) return 'An error has occurred: ' + error.message
     
       return (
         <div>
             {data.map(item=> {return( <div key={item.id}> {item.title} </div> )})}  
             <button onClick={(e)=>{
              e.preventDefault
              setNum(num+1)
              }}>

              데이터 추가sdsadsdasdsad
             </button>
         </div>
    );
}

export default Weather 