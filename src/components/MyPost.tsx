import React from 'react'
import Model from './shared/Model'
import Post from './shared/Post'
import avatar from '../Images/avatar.webp'
const MyPost = () => {
  return (
    <>
      <Model title='My Posts'>
       {[...Array(10)].map((_,index)=>(
        <Post key={index} name="You" pic={avatar} created="2025-05-05T07:36:53.299+00:00" icon="delete">mine</Post>
       ))} 
      </Model>
    </>
  )
}

export default MyPost
