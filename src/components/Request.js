import React, { useState } from "react";
import RequestDataService from "../services/RequestService";

const Request = () => {
  const initialTutorialState = {
    rt_id: '',
    amount: '',
    date_time: '',
    memo: '',
    ssn: '',

  };
  const [request, setRequest] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setRequest({ ...request, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
      amount: request.amount,
      memo: request.memo,
      ssn: request.ssn,
    };

    RequestDataService.create(data)
      .then(response => {
        setRequest({
          amount: response.data.amount,
          memo: response.data.memo,
          ssn: response.data.ssn,
          rt_id: response.data.rt_id,
          date_time: response.data.date_time,
        
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setRequest(initialTutorialState);
    setSubmitted(false);
  };

  return (
	<div className="submit-form">
	{submitted ? (
	  <div>
	    <h4>You submitted successfully!</h4>
	    <button className="btn btn-success" onClick={newTutorial}>
	      Add
	    </button>
	  </div>
	) : (
	  <div>
      <div className="text-center p-3">
          <label htmlFor="title">Request Money</label>
        </div>
       <div className="form-group">
	      <label htmlFor="description">Amount</label>
	      <input
		type="number"
		className="form-control"
		id="amount"
		required
		value={request.amount}
		onChange={handleInputChange}
		name="amount"
	      />
	    </div>
      <div className="form-group">
	      <label htmlFor="description">Memo</label>
	      <input
		type="text"
		className="form-control"
		id="memo"
		required
		value={request.memo}
		onChange={handleInputChange}
		name="memo"
	      />
	    </div>
    
	    <div className="form-group">
	      <label htmlFor="description">SSN</label>
	      <input
		type="number"
		className="form-control"
		id="ssn"
		required
		value={request.ssn}
		onChange={handleInputChange}
		name="ssn"
	      />
	    </div>
      <div className="text-center">
	    <button onClick={saveTutorial} className="btn btn-success m-3">
	      Submit
	    </button>
      </div>
	  </div>
	)}
      </div>
    );
  };
  

export default Request;