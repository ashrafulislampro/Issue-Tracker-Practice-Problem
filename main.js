document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}
// add issue count
const addIssueCount = () =>{
  const closedIssue = calculateIssue("closed");
  const totalIssue = calculateIssue("total");
  document.getElementById("total_issue").innerText = totalIssue;
  document.getElementById("closed_issue").innerText = closedIssue;
}
// increase issue count value by btn click
const calculateIssue = id =>{
  const issueCount = document.getElementById(id + "_issue");
  const issueCountNum = parseInt(issueCount.innerText);
  let newIssueNumber = issueCountNum + 1;
  issueCount.innerText = newIssueNumber;
  return issueCount.innerText;
}
// decrease issue reduce value by close or delete btn click
const reduceIssue = id =>{
  const issueDecrement = document.getElementById(id + "_issue");
  const issueDecrementNum = parseInt(issueDecrement.innerText);
  let newIssueNumber = issueDecrementNum;
  if(newIssueNumber > 0){
    newIssueNumber = issueDecrementNum - 1;
  }
  issueDecrement.innerText = newIssueNumber;
  return issueDecrement.innerText;
}
// closed btn functionality
const setStatusClosed = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  currentIssue.description = currentIssue.description.strike();
  localStorage.setItem('issues',JSON.stringify(issues));
  fetchIssues();
  // click to close btn then reduce Closed Issue count
  const closedIssueReduce = reduceIssue("closed");
  document.getElementById("closed_issue").innerText = closedIssueReduce;
  
}

// delete btn
const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  // const remainingIssues = issues.filter( issue.id !== id );
  for(let i = 0; i< issues.length; i++) {
    if(issues[i].id == id) {
      issues.splice(i, 1);
    }
  }
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  const totalIssueReduce = reduceIssue("total");
  document.getElementById("total_issue").innerText = totalIssueReduce;
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
