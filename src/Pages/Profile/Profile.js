import { useParams } from 'react-router-dom';

function Profile() {
    const { nickname } = useParams();
    const cleanNickname = nickname.startsWith('@') ? nickname.slice(1) : nickname;

    return <div>Trang cá nhân của {cleanNickname}</div>;
}

export default Profile;
