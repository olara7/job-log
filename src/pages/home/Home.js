import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useState } from 'react'

import styles from './Home.module.css'

//Bootstrap
import { Button } from 'react-bootstrap'

//components
import JobForm from './JobForm'
import JobList from './JobList'

export default function Home() {
    const { user } = useAuthContext()
    const { documents, error } = useCollection(
        'jobs',
        ["uid", "==", user.uid],
        ["jobStatus", "asc"]
    )

    const [showModal, setShowModal] = useState(false)

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    return (
        <div className={styles.container}>
           <div className='text-center'> 
            <Button style={{ width: '360px' }} variant="success" size="lg" onClick={toggleModal}>Add a New Job </Button> 
           </div>
            {showModal && (<div className={styles.sidebar}>
                <JobForm toggleModal={toggleModal} uid={user.uid} />
            </div>)}
            {!showModal && (<div className={styles.content}>
                {error && <p> {error} </p>}
                {documents && <JobList jobs={documents}/>}
            </div>)}
        </div>
    )
}