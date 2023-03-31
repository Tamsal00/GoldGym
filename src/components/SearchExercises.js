import React,{useEffect,useState} from 'react'
import {Box,Button,Stack,TextField,Typography} from '@mui/material'
import { border } from '@mui/system'
import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

   const SearchExercises = ({setExercises,bodyPart,setBodyPart}) => {
    
    const [Search,setSearch]= useState('');
    const [bodyParts,setBodyParts]=useState([]);

    useEffect( () =>{
     const fetchExercisesData = async () =>{
      const bodyPartData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList',exerciseOptions);
      setBodyParts(['all' , ...bodyPartData]);
     } 

     fetchExercisesData();
    }, [] )
     const handleSearch = async () =>{

              if(Search){
                const exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises',exerciseOptions);               
                const SearchExercises = exerciseData.filter(
                  (exercise) => exercise.name.toLowerCase().includes(Search)
                  || exercise.target.toLowerCase().includes(Search)
                  ||  exercise.equipment.toLowerCase().includes(Search)
                  ||  exercise.bodyPart.toLowerCase().includes(Search)
                );
                  
               setSearch('');
               setExercises(SearchExercises);
              }
     }

  return (
    <Stack alignItems="center" mt="37px"
    justifyContent="center" p="20px">
      <Typography fontWeight={700}
       sx={{fontSize:{lg: '44px',xs:'30px'}}}
       mb="50px" textAlign="center"
      >
          Awesome Exercise For You<br/>
      </Typography>
      <Box position="relative" mb="72px">
         <TextField
           sx={{
            input:{
                fontWeight:'700',
                border: 'none', borderRadius:'4px'
            },
            width:{
                lg:'800px',xs:'350px'
            },
            backgroundColor:'#fff',
            borderRadius:'40px'
           }}
           height="76px"
           value={Search}
           onChange={(e)=>setSearch(e.target.value.toLowerCase())}
           placeholder="Search Exercises"
           onFocus="none"
           type="text"
         />
         <Button className="search-btn"
          sx={{
            bgcolor:'#FF2625',color:"#fff",textTransform:'none',
            width:{
                lg: '175px' , xs: '80px'
            },
            fontSize:{
                lg:'20px', xs:'14px'
            },
            height: '56px',
            position: "absolute",
            right: '0'
          }}
          onClick={handleSearch}
         >
              Search
         </Button>
      </Box>
      <Box sx={{position: 'relative', width:'100%', p: '20px'}}>
          
          <HorizontalScrollbar data={bodyParts}
            bodyPart={bodyPart} setBodyPart={setBodyPart}
            isBodyParts
          />
      </Box>
    </Stack>
  )
}

export default SearchExercises
