import { useParams } from 'react-router-dom';
import UserPage from '~/components/UserPage';

function Profile() {
  const { nickname } = useParams();
  return (
    <>
      <UserPage userName={nickname} />
    </>
  );
}

export default Profile;
