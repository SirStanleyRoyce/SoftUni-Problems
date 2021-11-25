import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { deletePet } from "../../services/petService"

export default function DeletePet({ petId }) {
    useEffect(() => {
        if (!window.confirm('Are you sure you want to delete this post?'))
            return;

        async function deleteFunc() {
            try {
                await deletePet(petId);
            } catch (e) {
                console.error(e.message);
            }
        }
        deleteFunc();
    }, [])


    return <Navigate to="/" replace={true} />
}