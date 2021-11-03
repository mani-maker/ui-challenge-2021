import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Form.css';
import { Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const ModalForm = () => {

    const [modalShow, setModalShow] = useState(false);
    const [error, setError] = useState();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    const loadData = async () => {
        setLoading(true)
        try {
            const data = (await axios('https://randomuser.me/api')).data;
            setTimeout(() => {
                setUser(data.results[0]);
            }, 1000);
        }
        catch (error) {
            console.log(error, 'error')
        }
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }

    // useEffect(() => {
    //     loadData()
    // }, []);

    function Istype() {
        setError(true)
    }
    
    const resetState = () => {
        setLoading(false)
        setUser({})
        setModalShow(false)
    }

    
    const _renderModal = () => {
        return (
            <Modal
                show={modalShow} onHide={() => setModalShow(false)}
                size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Login
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-container">
                        {!loading && user.name ? <p style={{ color: "red" }}>Content is changed</p> : ""}
                        <p>First name</p>
                        <input type="text" className="first" placeholder="First name"
                            value={loading ? "Please wait..." : user.name?.title} required={true}
                            onChange={Istype} />
                        <br />
                        <p>Last name</p>
                        <input type="text" className="last" placeholder="Last name"
                            value={loading ? "Please wait..." : user.name?.last} required={true} />
                    </div>
                    <button disabled={loading} className={`confirm ${loading ? 'btn btn-disabled' : ''}`}>Confirm</button>
                    <button className="cancel" onClick={resetState}>Cancel</button>
                </Modal.Body>
               
            </Modal>
        );
    }

    return (
        <div>
            <Button variant="primary" onClick={() => {
                setModalShow(true)
                loadData()
            }}>
                Click here
            </Button>
            {_renderModal()}
        </div>
    )
}

export default ModalForm;