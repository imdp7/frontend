import React, { useState, useEffect } from "react";
import SendDataService from "../services/SendService";
import RequestDataService from "../services/RequestService";
import { Link } from "react-router-dom";


const TutorialsList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTransaction, setSearchTransaction] = useState("");

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const onChangeSearchTransaction = e => {
    const searchTransaction = e.target.value;
    setSearchTransaction(searchTransaction);
  };

  const retrieveTutorials = () => {
    SendDataService.getAll()
      .then(response => {
        setTutorials(response.data);
      })
      .catch(e => {
        console.log(e);
      });
	  
	  RequestDataService.getAll()
      .then(response => {
        setTutorials(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTutorials();
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
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
	    {tutorials &&
	      tutorials.map((tutorial, index) => (
		<li
		  className={
		    "list-group-item " + (index === currentIndex ? "active" : "")
		  }
		  onClick={() => setActiveTutorial(tutorial, index)}
		  key={index}
		>
		  {tutorial.memo}
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
		  <strong>Balance Available:</strong>
		</label>{" "}
		{currentTutorial.ssn ? currentTutorial.ssn :'Not Available'}
	      </div>
	      <div>
		<label>
		  <strong>Amount:</strong>
		</label>{" "}
		{currentTutorial.amount ? currentTutorial.amount : 'Not Available'}
	      </div>
		  <div>
		<label>
		  <strong>Email:</strong>
		</label>{" "}
		{currentTutorial.email ? currentTutorial.email :'Not Available' }
	      </div>

	      <div>
		<label>
		  <strong>Description:</strong>
		</label>{" "}
		{currentTutorial.description ? currentTutorial.description :'Not Available' }
	      </div>
  
	      <Link
		to={"/tutorials/" + currentTutorial.account_no}
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