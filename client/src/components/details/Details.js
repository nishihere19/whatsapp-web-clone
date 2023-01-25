import "./Details.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Axios from "axios";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { archiveActions } from "../../Library/archiveSlice";

//gets the URL from backend
const URL = process.env.REACT_APP_BACKEND_URL;

//this is the details component for the recipient title bar
export default function Details({ contact, userInfo }) {
  const dispatch = useDispatch();

  //this function hits the add_archive route which adds the friend to archive if not archived or removes them
  const addArchive = async (e) => {
    e.preventDefault();
    await Axios.post(`${URL}/archives/add_archive`, {
      me: userInfo.email,
      them: contact,
    })
      .catch((err) => {
        console.log(err);
      });
    //Once we archive a user, we toggle the archived state
    dispatch(archiveActions.toggleState());
  };

  return (
    <div className='details-section'>
      <div className='user'>
        <AccountCircleIcon className='icon-clickable profile-picture' />
        <div className='details'>
          <span className='name'>{contact}</span>
        </div>
      </div>
      <div className='actions'>
        <Button
          variant='contained'
          onClick={addArchive}
          className='MUIbutton'
          disableElevation
        >
          <i class='fa-solid fa-box-archive'></i>
        </Button>
      </div>
    </div>
  );
}
