import "./Archive.css";

import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { archiveActions } from "../../Library/archiveSlice"


export default function Archive({archiveOpen}) {
  const[value,setValue] = useState("ARCHIVES");
  
  //Toggles the archive/messages name for the list
  useEffect(()=>{
    if(archiveOpen===true) setValue("MESSAGES")
    else setValue("ARCHIVES")
  },[archiveOpen])
  const dispatch = useDispatch();

  const [openArchive,setOpenArchive] = useState(archiveOpen);

  //dispatches the archive toggle state
  const toggleArchive = ()=> {
    setOpenArchive(!openArchive);
    dispatch(archiveActions.toggleState())
  }

  return (
    <div className='archive-section'>
      <Button variant='contained' onClick={toggleArchive} className='MUIbutton' disableElevation>
        <i className='fa-solid fa-box-archive'></i> {value}
      </Button>
    </div>
  );
}
