"use client"

import { useParams, useSearchParams } from "next/navigation"

const User = () => {
    const {id}= useParams()
    const [value]= useSearchParams()

    return<>User: {id} Value: {value}</>}
export default User