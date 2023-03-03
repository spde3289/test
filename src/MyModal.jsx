import { useParams } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';

export default function MyModal() {
  const { id } = useParams();
  // use the id value to determine what content to display in the modal window
  return (
    <Modal open={true}>
      <div><Link to='/'> asdasdasdasdasd{id}</Link></div>
    </Modal>
  );
}