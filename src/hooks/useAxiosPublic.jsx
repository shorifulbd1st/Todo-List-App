import axios from 'axios'
import React from 'react'

const axiosPublic = axios.create({
    baseURL: 'https://todo-list-server-amber.vercel.app'
    // baseURL: 'http://localhost:5000'
})

const useAxiosPublic = () => {
    return axiosPublic
}

export default useAxiosPublic
