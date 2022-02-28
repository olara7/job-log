import { useEffect } from 'react'
import { useState } from 'react'
import { FloatingLabel, Form, Button } from 'react-bootstrap'
import { useFirestore } from '../../hooks/useFirestore'

import styles from './Home.module.css'

export default function JobForm({ uid, toggleModal }) {
    const [jobTitle, setJobTitle] = useState('')
    const [jobCompany, setJobCompany] = useState('')
    const [jobType, setJobType] = useState('')
    const [jobLocation, setJobLocation] = useState('')
    const [jobStatus, setJobStatus] = useState('')
    const [jobLink, setJobLink] = useState('')
    const { addDocument, response } = useFirestore('jobs')

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(jobTitle, jobCompany, jobType, jobLocation, jobStatus)
        
        addDocument({
            uid: uid,
            jobTitle,
            jobCompany,
            jobType,
            jobLocation,
            jobStatus,
            jobLink
        })

        toggleModal()

    }

    useEffect(() => {
        if(response.success) {
            setJobTitle('')
            setJobCompany('')
            setJobType('')
            setJobLocation('')
            setJobStatus('')
            setJobLink('')
        }
    }, [response.success])

    return (
        //fragment because we don't need to ouput a div and we will have two elements side by side
        <div className={styles['modal-backdrop']}>
            <div className={styles.modal}>
            <h3> Add a Job</h3>
            <form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label> Job Title </Form.Label>
                <FloatingLabel label="Title">
                <Form.Control
                    type="text" 
                    required
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Job Title"
                    value={jobTitle}
                    />
                </FloatingLabel>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formCompany">
                <Form.Label> Job Company </Form.Label>
                <FloatingLabel label="Company">
                <Form.Control
                    type="text" 
                    required
                    onChange={(e) => setJobCompany(e.target.value)}
                    placeholder="Job Company"
                    value={jobCompany}
                    />
                </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formType">
                <Form.Label> Job Type </Form.Label>
                <FloatingLabel label="Type">
                <Form.Select
                    required
                    onChange={(e) => setJobType(e.target.value)}
                    placeholder="Job type"
                    value={jobType}
                    >
                    <option value=""> Select a job type</option>
                    <option value="Part Time"> Part Time </option>
                    <option value="Full Time"> Full Time </option>
                </Form.Select>
                </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLocation">
                <Form.Label> Job Location </Form.Label>
                <FloatingLabel label="Location">
                <Form.Control
                    type="text" 
                    required
                    onChange={(e) => setJobLocation(e.target.value)}
                    placeholder="Job Location"
                    value={jobLocation}
                    />
                </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStatus">
                <Form.Label> Job Status </Form.Label>
                <FloatingLabel label="Status">
                <Form.Select
                    required
                    onChange={(e) => setJobStatus(e.target.value)}
                    placeholder="Job Status"
                    value={jobStatus}
                    >
                    <option value=""> Select Job Status </option>
                    <option value="Accepted"> Accepted </option>
                    <option value="Active"> Active </option>
                    <option value="Inactive"> Inactive </option>
                </Form.Select>
                </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLink">
                <Form.Label> Job Link </Form.Label>
                <FloatingLabel label="Link">
                <Form.Control
                    type="text" 
                    required
                    onChange={(e) => setJobLink(e.target.value)}
                    placeholder="Job Location"
                    value={jobLink}
                    />
                </FloatingLabel>
                </Form.Group>


                <div className='text-center'><Button variant="success" type="submit"> Add Job </Button> </div>
            </form>
            <br></br>
            <div className='text-center' ><Button variant="secondary" className={styles['button-cancel']} onClick={toggleModal}> Cancel </Button> </div>
        </div>
        </div>
    )
}