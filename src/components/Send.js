import React, { useState } from "react";
import SendDataService from "../services/SendService";

const Send = () => {
  const initialSendState = {
    st_id: '',
    amount: '',
    date_time: '',
    memo: '',
    cancel_reason: '',
    id:'',
    ssn: '',

  };
  const [send, setSend] = useState(initialSendState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSend({ ...send, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
      amount: send.amount,
      memo: send.memo,
      cancel_reason: send.cancel_reason,
      ssn: send.ssn,
    };

    SendDataService.create(data)
      .then(response => {
        setSend({
          amount: response.data.amount,
          memo: response.data.memo,
          cancel_reason: response.data.cancel_reason,
          ssn: response.data.ssn,
          id: response.data.id,
          st_id: response.data.st_id,
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
    setSend(initialSendState);
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
          <label htmlFor="title">Send Money</label>
        </div>
       <div className="form-group">
	      <label htmlFor="description">Amount</label>
	      <input
		type="number"
		className="form-control"
		id="amount"
		required
		value={send.amount}
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
		value={send.memo}
		onChange={handleInputChange}
		name="memo"
	      />
	    </div>
	    <div className="form-group">
	      <label htmlFor="amount">Cancel Reason</label>
	      <input
		type="text"
		className="form-control"
		id="cancel_reason"
		required
		value={send.cancel_reason}
		onChange={handleInputChange}
		name="cancel_reason"
	      />
	    </div>
    
	    <div className="form-group">
	      <label htmlFor="description">SSN</label>
	      <input
		type="number"
		className="form-control"
		id="ssn"
		required
		value={send.ssn}
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
  

export default Send;