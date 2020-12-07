/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
/*
Create and insert/append the elements needed for the search component
*/

let header = document.querySelector('HEADER');
header.insertAdjacentHTML( 'beforeend', `
   <label for="search" class="student-search">
      <input id="search" type="text" placeholder="Search by name...">
      <button id="submit" type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
`);

/*
/*
creatediv` function
This function will create and main div element and add all the child elements 
needed to display all the main information about any student
*/
function creatediv(student) {
   // Nested function to create DOM elements and add their property values
   function createElement(elementName, property, value) {
     const element = document.createElement(elementName);
     for (let i = 0; i<=property.length;i++){
      element[property[i]] = value[i]; 
     }  
     return element;
   }
   // Nested function to append child elements to the main div element
   function appendTodiv(elementName, property, value) {
     const element = createElement(elementName, property, value);     
     div.appendChild(element); 
   }
   // create the main div element
   const div = createElement('div',['className'],["student-details"]);
   // append child elements to the main div 
   appendTodiv('img', ['className','src'], ["avatar",student.picture.large]);     
   appendTodiv('h3', ['textContent'], [`${student.name.first} ${student.name.last}`]);
   appendTodiv('span', ['className','textContent'], ["email",student.email]);
   return div;
 }

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
let items = 9 // maximum students displayed on a single page
// select the element with a class of `student-list` and assign it to a variable
let elements = document.getElementsByClassName('student-list');

let studentList = elements[0];

function showPage(list, page) {
   // create two variables which will represent the index for the first and last student on the page
   let startIndex = (page  * items) - items
   let endIndex = page * items
   // Check if the number of students to be displayed on the page is less than the max mumber possible (items)
   if (endIndex > list.length){
      endIndex = list.length;
   }
   // set the innerHTML property of the variable you just created to an empty string
   studentList.innerHTML = '';
   // loop over the length of the `list` parameter
   // inside the loop create a conditional to display the proper students
   for (let i = startIndex; i < endIndex; i+=1 ){

      // create list item for each student and append the child items containing the student information
      let listItem = document.createElement('li');
      listItem.className = "student-item";

      let divMain = creatediv(list[i])

      let divDetails= document.createElement('div');
      divDetails.className = "joined-details";
      let spanItem= document.createElement('span');
      spanItem.className = "date";
      spanItem.textContent = `Joined ${list[i].registered.date}`;

      divDetails.appendChild (spanItem);
      
      listItem.appendChild(divMain)
      listItem.appendChild(divDetails)
     
      studentList.appendChild(listItem)
   }
 }


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list){
   
   // variable to calculate the number of pages needed
   numOfPages = Math.ceil(list.length/items)

  // select the element with a class of `link-list` and assign it to a variable
   let elements = document.getElementsByClassName('link-list');
  
   let linkList = elements[0];

  // set the innerHTML property of the variable you just created to an empty string

   linkList.innerHTML = '';

  // loop over the number of pages needed
   for (let i = 1;i<=numOfPages;i+=1){
      // create a list element
      let listItem = document.createElement('li');
      // create a button element
      let buttonItem = document.createElement('button');
      buttonItem.textContent = i;
      if (i==1){
      buttonItem.className = 'active'; // Assign active class to the 1st button element
     }
      listItem.appendChild(buttonItem);
      linkList.appendChild(listItem);
  }
  // select the buttons in the linkList element 
  let pageBtns = linkList.querySelectorAll('BUTTON')
  // Event listener to check which button is clicked and change its class to active
     linkList.addEventListener('click',(e) => {
     if (e.target.tagName === 'BUTTON') {
        
        for (let j = 0; j < pageBtns.length; j += 1){ 
         if (j+1 == e.target.textContent) {
            pageBtns[j].className = 'active';  
          } else {
            pageBtns[j].className = '';                         
          }
        } 
        showPage(data,e.target.textContent)
     }
  })

}
/*
This function will search for student names based on the search bar user input and return matches
*/

function searchStudents ( list ) {
   let matches = []; // Array to store all the students that match the search 
   let searchBar = document.getElementById('search');
   let searchBtn = document.getElementById('submit'); 

   // Nested function to find search results 
   function findMatch(input){
      for ( let i = 0; i < list.length; i++ ) {
         let firstName = list[i].name.first.toLowerCase();
         let lastName = list[i].name.last.toLowerCase();
         if ( firstName.includes( input ) || lastName.includes( input ) ) {
            matches.push( list[i] ); // update the matched searches 
         }
      }
   }
   // Nested function to display search results 
   function displayMatches(){
   // if no matches display error message, else display search results
      if ( matches.length === 0 ) {
         studentList.innerHTML = ' ';
         studentList.insertAdjacentHTML( 'beforeend', `
            <h1>Information about ${searchBar.value} is not the the database</h1>
            `);
         addPagination(matches);
         } else {
            showPage(matches, 1);
            addPagination(matches);
      }
   }

   // search bar event handler
   searchBar.addEventListener( 'keyup', (e) => {
      matches = []; // clear all the previous search results
      let searchInput = searchBar.value.toLowerCase();
      findMatch(searchInput)
      displayMatches()
   });
   
   // search button event handler
   searchBtn.addEventListener( 'click', (e) => {
      matches = []; // clear all the previous search results
      let searchInput = searchBar.value.toLowerCase();
      findMatch(searchInput)
      displayMatches()
   });
}
// Call functions
showPage(data, 1)
addPagination(data)
searchStudents(data);