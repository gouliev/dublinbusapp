import React from 'react'
import {useState } from "react";
import Cookies from 'universal-cookie';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ModalFunction(){    
    console.log("called")
    const cookies = new Cookies();
    //https://react-bootstrap.github.io/components/modal/ this needs to be cited.
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const cookieValue = cookies.get('AfterFirstUse')
    if(cookieValue == 'Yes'){
      return(null);
    }else{
        //un comment this to get the no show to work.
        //cookies.set('AfterFirstUse', 'Yes', { path: '/' });
        //console.log(cookies.get('myCat')); 
        return (
            <> 
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>How To Use Our Dublin Bus Application!</Modal.Title>
                </Modal.Header>
                <Modal.Body>This message will display once, only on your first time using this application. Below is a Gif showing how to use it.</Modal.Body>
                <Modal.Body>Gif Showing Use</Modal.Body>
                <Modal.Body>To use this properly, you must insert your origin location, or use your current location and your destination.You can insert the day
                  and time you wish to travel at. If you do not, we will use the current day and time ! To use the service again, clear the route and go again. 
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

    return(
        null
    )
}
    