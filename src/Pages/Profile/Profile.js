import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ActionsApp from '~/components/ActionsApp';
import UserPage from '~/components/UserPage';
import { useAuth } from '~/Contexts/authContext';

function Profile() {
  const { nickname } = useParams();
  const { user } = useAuth();
  const [isMe, setIsMe] = useState(false);
  const name = `@${user.nickname}`;
  useEffect(() => {
    console.log('user: ', name);
    console.log('nickname: ', nickname);
    console.log('the same: ', name === nickname);
    if (name === nickname) {
      setIsMe(true);
    } else {
      setIsMe(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, nickname]);

  return (
    <>
      <UserPage isMe={isMe} userName={nickname} />
      <ActionsApp />
    </>
  );
}

export default Profile;
