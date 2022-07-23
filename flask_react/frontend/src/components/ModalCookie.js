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
        console.log(true)
    }else{
        console.log(false)
        //un comment this to get the no show to work.
        //cookies.set('AfterFirstUse', 'Yes', { path: '/' });
        //console.log(cookies.get('myCat')); 
        return (
            <> 
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Save Changes
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
    