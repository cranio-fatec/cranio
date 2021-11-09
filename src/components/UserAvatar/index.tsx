import React from 'react'
import CustomUser from '../../@types/User'

// import { Container } from './styles';

interface UserAvatarProps {
  user: CustomUser
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  const nameArr = user.username.split('/')[0].split(' ')
  const acronym =
    nameArr.length > 1
      ? `${nameArr[0][0]}${nameArr[1][0]}`.toUpperCase()
      : `${nameArr[0][0]}${nameArr[0][1]}`.toUpperCase()

  return (
    <div className="icon-container">
      {user.image ? (
        <img src={user.image} alt={acronym} crossOrigin="anonymous" />
      ) : (
        acronym
      )}
    </div>
  )
}

export default UserAvatar
