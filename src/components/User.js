import React, { useState } from "react";
import UserDataService from "../services/UserService";

const User = () => {
  const initialSendState = {
    name:'',
    phone_no:'',
    ssn:'',
    bank_id:'',
    bank_no:'',
    pba_verified:'',
    balance:'',
  };
  const [user, setUser] = useState(initialSendState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
      name: user.name,
      phone_no: user.phone_no,
      ssn: user.ssn,
      balance: user.balance,
      bank_no: user.bank_no,
    };

    UserDataService.create(data)
      .then(response => {
        setUser({
          name: response.data.name,
          balance: response.data.balance,
          phone_no: response.data.phone_no,
          ssn: response.data.ssn,
          bank_id: response.data.bank_id,
          bank_no: response.data.bank_no,
          pba_verified: response.data.pba_verified,
        
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setUser(initialSendState);
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
		  <div className="m-4 text-center">
			  <label htmlFor="title">Login</label>
			  </div>
       <div className="form-group">
	      <label htmlFor="description">Name</label>
	      <input
		type="text"
		className="form-control"
		id="name"
		required
		value={user.name}
		onChange={handleInputChange}
		name="name"
	      />
	    </div>
      <div className="form-group">
	      <label htmlFor="description">Phone No</label>
	      <input
		type="number"
		className="form-control"
		id="phone_no"
		required
		value={user.phone_no}
		onChange={handleInputChange}
		name="phone_no"
	      />
	    </div>
	    <div className="form-group">
	      <label htmlFor="amount">SSN</label>
	      <input
		type="number"
		className="form-control"
		id="ssn"
		required
		value={user.ssn}
		onChange={handleInputChange}
		name="ssn"
	      />
	    </div>
        <div className="form-group">
	      <label htmlFor="amount">Balance</label>
	      <input
		type="number"
		className="form-control"
		id="balance"
		required
		value={user.balance}
		onChange={handleInputChange}
		name="balance"
	      />
	    </div>
        <div className="form-group">
	      <label htmlFor="amount">Bank No</label>
	      <input
		type="number"
		className="form-control"
		id="bank_no"
		required
		value={user.bank_no}
		onChange={handleInputChange}
		name="bank_no"
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
  

export default User;