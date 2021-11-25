import { useState, useEffect } from "react"
import { useParams, Routes, Route, Navigate, } from "react-router";
import { Link } from "react-router-dom";

import * as petService from "../../services/petService";
import EditPet from "./EditPet";
import DeletePet from "./DeletePet";

export default function Details({ userData }) {
    const [petData, setPetData] = useState({});
    const [isValidPet, setIsValidPet] = useState(true);
    const { petId } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                setPetData(await petService.getOne(petId));
            }
            catch (e) {
                console.error(e.message);
                setIsValidPet(false);
            }
        }
        fetchData();

    }, [petId])

    return (

        isValidPet ?
            <section id="details-page" className="details">
                < div className="pet-information" >
                    <h3>Name: {petData.name}</h3>
                    <p className="type">Type: {petData.type}</p>
                    <p className="img"><img src={petData.imageUrl} alt="pet img" /></p>
                    <div className="actions">
                        {
                            (userData.isAuthenticated && petService.isOwner(userData.user.userId, petData._ownerId))
                                ?
                                <>
                                    <Link className="button" to="edit">Edit</Link>
                                    <Link className="button" to="delete">Delete</Link>
                                </>
                                : <></>
                        }
                        <Routes>
                            <Route path="edit" element={<EditPet petId={petId} petData={petData} setPetData={setPetData} userId={userData.user.userId} />} />
                            <Route path="delete" element={<DeletePet petId={petId} />} />
                        </Routes>

                    </div>
                </div >
                <div className="pet-description">
                    <h3>Description:</h3>
                    <p>{petData.description}</p>
                </div>
            </section >

            : <Navigate to="/404" item="Pet" />
    )
}