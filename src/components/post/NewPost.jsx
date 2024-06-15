import React from 'react'
import "../../styles/post.css"
import { useUser } from '../context/UserContext'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export const NewPost = () => {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm({
        mode: onclick
    })
    const onSubmit = async (data) => {
        console.log("in form add NewPost")
        console.log("formData ", data)
        
        const formData = new FormData()
        formData.append('description', data.description)
        if (data.image[0]) {
            formData.append('file', data.image[0])
        }

        try {
            const token = Cookies.get('token')
            console.log('token in add blog in frontend ', token)

            const response = await axios.post('http://localhost:3008/blog', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'multipart/form-data'
                }
            })
            console.log("response of add blog ", response)
            if (response.status === 201) {
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }
    //context
    const user = useUser();
    return (
        <div className="postmain">
            <div className="feedopt">
                <div className="follow">
                    <div className="follow_items">For you</div>
                </div>
                <div className="follow">
                    <div className="follow_items">Following</div>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="text-box">
                    <img src={user?.profilePicture} alt="Profile" className="profile" />
                    <input
                        type="text"
                        className="textinput"
                        placeholder="What is happening?"
                        {...register('description', { required: 'description is required' })}
                    />
                </div>

                <div className="reply">
                    <i className="fa-solid fa-earth earth" />
                    Everyone can reply
                </div>

                <div className="icons">
                    <input
                        type="file"
                        {...register('image')}
                        accept="image/*"
                        id="image-upload"
                        style={{ display: 'none' }}
                    />
                    <i className="fa-regular fa-image iconn img" onClick={ () => document.getElementById('image-upload').click()}/>
                    <i className="fa-solid fa-bars-progress iconn" />
                    <i className="fa-regular fa-face-smile iconn" />
                    <i className="fa-regular fa-calendar iconn" />
                    <i className="fa-solid fa-location-dot iconn" />
                    <button type="submit" className='submitt'>Post</button>
                </div>
            </form>
        </div>
    )
}
