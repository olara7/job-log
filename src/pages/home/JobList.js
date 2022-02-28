import { useFirestore } from '../../hooks/useFirestore'

//styles
import styles from './Home.module.css'
import { Card, Button, Dropdown, DropdownButton } from 'react-bootstrap'

export default function JobList({ jobs }) {
    const { deleteDocument, updateDocument, response } = useFirestore('jobs')

    console.log(response)

    return (
        <div className={styles['card-view']}>
        {jobs.map((job) => (
            <div key={job.id}>
                <Card border={job.jobStatus === "Accepted" ? 'success': job.jobStatus === "Active" ? 'primary': 'secondary'} style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title> {job.jobTitle}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{job.jobCompany}</Card.Subtitle>
                    <Card.Text>
                    {job.jobType} | {job.jobLocation} | {job.jobStatus}
                    </Card.Text>
                    <Button 
                    className='mb-3' 
                    variant={job.jobStatus === "Accepted" ? 'success': job.jobStatus === "Active" ? 'primary': 'secondary'}
                    href={job.jobLink} target="_blank" rel="noopener noreferrer"
                    > Link to Job Post </Button>
                    <DropdownButton variant="light" size="sm" id="dropdown-basic-button" title="More">
                    <Dropdown.Item onClick={() => deleteDocument(job.id)}> Delete </Dropdown.Item>
                    <Dropdown.Item onClick={() => updateDocument(job.id, {jobStatus: "Accepted"})}>Update to Accepted</Dropdown.Item>
                    <Dropdown.Item onClick={() => updateDocument(job.id, {jobStatus: "Active"})}>Update to Active</Dropdown.Item>
                    <Dropdown.Item onClick={() => updateDocument(job.id, {jobStatus: "Inactive"})}>Update to Inactive</Dropdown.Item>
                    </DropdownButton>
                </Card.Body>
                </Card>
            </div>
        ))}
        </div>
    )
}