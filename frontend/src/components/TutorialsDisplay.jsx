import React from 'react'
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAssignTutorials } from '../features/assignTutorials/assignSlice'
import {FadeLoader} from 'react-spinners'
import Accordion from 'react-bootstrap/Accordion'

function TutorialsDisplay() {

  const dispatch = useDispatch() 
  const {assignTutorials, isError, isLoading, message} = useSelector((state) => state.assigntutorials)

  useEffect(()=>{

    if(isError){
      console.log(message)
    }
  
    dispatch(getAssignTutorials())
  
    //return () => { dispatch(reset()) }  
  },[isError, message, dispatch])

  if(isLoading){
    return <div className={"spinner"}><FadeLoader color="#36d7b7" /></div>
  }


  return (<>
    {assignTutorials.assignTutorials?.length > 0 ? 
      (<>
      <div className='row d-flex align-items-center justify-content-center' >
        <div className="accordion" id="accordionDetails">
              {  
              assignTutorials.assignTutorials.map((tutorial, index)=>(
                <Accordion>
                    <Accordion.Item eventKey={tutorial.tutorialId} >
                        <Accordion.Header> <h5>
                          {tutorial.title} </h5>
                        </Accordion.Header>
                        <Accordion.Body> 
                          <h6>Opis:</h6> <p> {tutorial.description} </p>
                          <h6>Ukończono w: </h6>
                          {tutorial.progress}
                          <a className="btn btn-primary m-4" href={'/details/'+tutorial.tutorialId} style={{maxWidth:"5rem", minWidth:"5rem"}}> details</a>
                        </Accordion.Body> 
                    </Accordion.Item>    
                </Accordion> 
               
                ))}
        
        </div>
      </div>
      </>) : (<><h1>Assign tutorial to your account</h1></>)}
    </>)
}

export default TutorialsDisplay