import React from 'react'
import {useState } from "react";
import Cookies from 'universal-cookie';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalCookie.css'

export default function ModalFunction(){    
    console.log("called")
    const cookies = new Cookies();
    //https://react-bootstrap.github.io/components/modal/ this needs to be cited.
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const cookieValue = cookies.get('AfterFirstUse')
    if(cookieValue === 'Yes'){
      return(null);
    }else{
        //un comment this to get the no show to work.
        //cookies.set('AfterFirstUse', 'Yes', { path: '/' });
        //console.log(cookies.get('myCat')); 
        return (
            <> 
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Instructions for Use!</Modal.Title>
                </Modal.Header>
                <Modal.Body>This message will display oonly once, so you better read it !</Modal.Body>
                <Modal.Body>Gif Showing Use</Modal.Body>
                <Modal.Body>To use this properly, you must insert your origin location, or use your current location and your destination.You can insert the day
                  and time you wish to travel at. Save and use your favorite route using the buttons. We will always load your last route. 
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          );
    }

    // return(
    //     null
    // )
}
    