import { FaTimes, FaPencilAlt, FaRegCircle } from "react-icons/fa";

function Icon({ name }){
    if(name == "circle")
    {
        return <FaRegCircle />;
    }
    else if(name == "cross")
    {
        return <FaTimes />;
    }
    else
    {
        return <FaPencilAlt />
    }
}

export default Icon;