import React, { useState, useEffect } from "react";
import SendDataService from "../services/SendService";
import RequestDataService from "../services/RequestService";
import UserService from "../services/UserService";
import { Link } from "react-router-dom";


const TutorialsList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [send, setSend] = useState([]);
  const [request, setRequest] = useState([]);
  const [user, setUser] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTransaction, setSearchTransaction] = useState("");

  useEffect(() => {
	sendTutorials();
	requestTutorials();
  }, []);

  const onChangeSearchTransaction = e => {
    const searchTransaction = e.target.value;
    setSearchTransaction(searchTransaction);
  };

  const sendTutorials = () => {
    SendDataService.getAll()
      .then(response => {
        setSend(response.data);
		
      })
      .catch(e => {
        console.log(e);
      });
  };

  const requestTutorials = () => {
	  RequestDataService.getAll()
      .then(response => {
        setRequest(response.data);
		
      })
      .catch(e => {
        console.log(e);
      });
  };
  const userTutorials = () => {
	  UserService.getAll()
      .then(response => {
		  const user = response.data;
        setUser(user);
		console.log(user.name)
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    sendTutorials();
	requestTutorials();
	userTutorials();
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveSend = (send) => {
    setCurrentTutorial(send);
	setCurrentIndex(send.ssn);
  };

  const setActiveRequest = (request) => {
    setCurrentTutorial(request);
    setCurrentIndex(request.ssn);
  };

  const removeAllTutorials = () => {
    SendDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTransaction = () => {
    SendDataService.findByTransaction(searchTransaction)
      .then(response => {
        setTutorials(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
	<div className="list row">
	<div className="col-md-8">
	  <div className="input-group mb-3">
	    <input
	      type="text"
	      className="form-control"
	      placeholder="Search by Transaction Type"
	      value={searchTransaction}
	      onChange={onChangeSearchTransaction}
	    />
	    <div className="input-group-append">
	      <button
		className="btn btn-outline-secondary"
		type="button"
		onClick={findByTransaction}
	      >
		Search
	      </button>
	    </div>
	  </div>
	</div>
	<div className="col-md-6">
	  <h4>Transaction List</h4>
  
	  <ul className="list-group">
	    {send &&
	      send.map((sen, index) => (
		<li
		  className={
		    "list-group-item " + (index === currentIndex ? "active" : "")
		  }
		  onClick={() => setActiveSend(sen, index)}
		  key={sen.ssn}
		>
		  Send : {sen.memo}
		</li>
	      ))}
	  </ul>
	  <ul className="list-group">
	    {request &&
	      request.map((req, index) => (
		<li
		  className={
		    "list-group-item " + (index === currentIndex ? "active" : "")
		  }
		  onClick={() => setActiveRequest(req, index)}
		  key={req.ssn}
		>
		  Request : {req.memo}
		</li>
	      ))}
	  </ul>
  
	  <button
	    className="m-3 btn btn-sm btn-danger"
	    onClick={removeAllTutorials}
	  >
	    Remove All
	  </button>
	</div>
	<div className="col-md-6">
	  {currentTutorial ? (
	    <div>
	      <h4>Transaction</h4>
	      <div>
		<label>
		  <strong>SSN:</strong>
		</label>{" "}
		{currentTutorial.ssn ? currentTutorial.ssn :'Not Available'}
	      </div>
			  {user.name ?
	      <div>
		<label>
		  <strong>Name:</strong>
		</label>{" "}
		{user.name ? user.name :'Not Available'}
	      </div>
		  : null}
	      <div>
		<label>
		  <strong>Amount:</strong>
		</label>{" "}
		{currentTutorial.amount ? currentTutorial.amount : 'Not Available'}
	      </div>
		  <div>
		<label>
		  <strong>Created At:</strong>
		</label>{" "}
		{currentTutorial.createdAt ? currentTutorial.createdAt :'Not Available' }
	      </div>

	      <div>
		<label>
		  <strong>Memo:</strong>
		</label>{" "}
		{currentTutorial.memo ? currentTutorial.memo :'Not Available' }
	      </div>
  
	      <Link
		to={"/transactions/" + currentTutorial.ssn}
		className="badge badge-warning border border-warning text-warning"
	      >
		Edit
	      </Link>
	    </div>
	  ) : (
	    <div>
	      <br />
	      <p>Please click on a Transaction...</p>
	    </div>
	  )}
	</div>
      </div>
    );
  };

export default TutorialsList;