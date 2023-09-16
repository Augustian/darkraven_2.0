import { Edit } from "@mui/icons-material";
import { Button, Link } from "@mui/material";
import { useHistory } from "react-router-dom";

const ActorSlot = ({ data }) => {
    const history = useHistory();
    
    return (
        <div className="actor-slot">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <a className="actoractor-slot-button">{data.name}</a>

                <Button className="ForeverVideo" onClick={() => history.push("/edaactor/" + data.id_actor)}>
                    <Link to={"/edaactor/" + data.id}>
                        <Edit style={{ color: "white" }} />
                    </Link>
                </Button>
            </div>
            <img src={data.image} />
            <div className="info_panel">
                <p>Дата рождения: {data.date_of_birth}</p>
                <p>Рост: {data.growth} м</p>
            </div>
        </div>
    );
}

export default ActorSlot;