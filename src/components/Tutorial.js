import React, { useState, useEffect } from "react";
import SendDataService from "../services/SendService";


const Tutorial = (props) => {
  const initialTutorialState = {
	id:null,
    amount:'',
    memo: "",
    createdAt: "",
	published: false
	
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const getTutorial = id => {
    SendDataService.get(id)
      .then(response => {
        setCurrentTutorial(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };



  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updatePublished = () => {
    var data = {
      ssn: currentTutorial.ssn,
      amount: currentTutorial.amount,
      memo: currentTutorial.memo,
      
    };

    SendDataService.update(currentTutorial.ssn, data)
      .then(response => {
        setCurrentTutorial({ ...currentTutorial});
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
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
        props.history.push("/transactions");
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