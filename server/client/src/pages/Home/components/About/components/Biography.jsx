import { useContext, useEffect, useState } from "react";
import { GrBook } from "react-icons/gr";
import { DataContext } from "../../../../../context/DataContext";

const Biography = () => {
    // Holds the state for the biography
    const { crud } = useContext(DataContext)



    // Holds the split version of the biography
    const [biography, setBiography] = useState([])



    // Gets the biography from the backend
    useEffect(() => {
        const fetching = async () => {
            const response = await crud({
                method: 'get',
                url: 'service/about/'
            })

            if(response.status == 200) {
                setBiography(response.data.data.biography[0].text.split('\n'))
            }
        }

        fetching()
    }, [])



    return (
        <div className="biography">
            <div className="biography-card">
                <div className="biography-heading">
                    <GrBook className="biography-icon" />
                    <p>Биография</p>
                </div>

                {
                    biography.map(paragraph => (
                        <p>{paragraph}</p>
                    ))
                }
            </div>
        </div>
    )
}

export default Biography