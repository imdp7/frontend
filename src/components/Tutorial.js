import React, { useState, useEffect } from "react";
import SendDataService from "../services/SendService";
import RequestDataService from "../services/RequestService";
import { useNavigate } from 'react-router-dom';

const Tutorial = ({ match }) => {
	const navigate = useNavigate();
	
  const initialTutorialState = {
	ssn:'',
    amount:'',
    memo: "",
    createdAt: "",
	id:''
	
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const getTutorial = ssn => {
    SendDataService.get(ssn)
      .then(response => {
        setCurrentTutorial(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(match?.params?.ssn);
  }, [match?.params?.ssn]);


  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };


  const updateTutorial = () => {
    SendDataService.update(currentTutorial.ssn, currentTutorial)
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    SendDataService.remove(currentTutorial.ssn)
      .then(response => {
        console.log(response.data);
        navigate('/transactions');
      })
      .catch(e => {
        console.log(e);
      });
    RequestDataService.remove(currentTutorial.ssn)
      .then(response => {
        console.log(response.data);
        navigate('/transactions');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
	<div>
	{currentTutorial ? (
	  <div className="edit-form">
	    <h4>Transaction</h4>
	    <form>
	      <div className="form-group">
		<label htmlFor="title">Amount</label>
		<input
		  type="text"
		  className="form-control"
		  id="amount"
		  name="amount"
		  value={currentTutorial.amount}
		  onChange={handleInputChange}
		/>
	      </div>
	      <div className="form-group">
		<label htmlFor="description">Memo</label>
		<input
		  type="text"
		  className="form-control"
		  id="memo"
		  name="memo"
		  value={currentTutorial.memo}
		  onChange={handleInputChange}
		/>
	      </div>
	    </form>

	    <button className="badge badge-danger mr-2 border border-warning text-warning" onClick={deleteTutorial}>
	      Delete
	    </button>
  
	    <button
	      type="submit"
	      className="badge badge-success border border-warning text-warning"
	      onClick={updateTutorial}
	    >
	      Update
	    </button>
	    <p>{message}</p>
	  </div>
	) : (
	  <div>
	    <br />
	    <p>Please click on a transaction...</p>
	  </div>
	)}

	
		
      </div>
	
    );
  };

export default Tutorial;