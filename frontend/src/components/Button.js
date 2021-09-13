import { Link } from "react-router-dom";
function OutlineButton(props)
{
    return (
        <Link to={props.to} className={`btn ${props.className}`}>{props.text} <i className="fas fa-long-arrow-alt-right"></i></Link>
    )
}
export default OutlineButton