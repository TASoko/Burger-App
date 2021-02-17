// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
      console.info('DOM loaded');
    }
  
    // A const was created to get the change-devour button instead of having to retype it everytime.
    const changeDevourBtns = document.querySelectorAll('.change-devour');
  
    // Below is the set up for the event listener for the change the state of an existing burger
    if (changeDevourBtns) {
      changeDevourBtns.forEach((button) => {
        button.addEventListener('click', (e) => {
          // Grabs the id of the element that goes by the name, "id"
          const id = e.target.getAttribute('data-id');
          //clicking on the botton changes to the devoured state of the burger to be true
          const newDevourState = {
            devoured: true,
          };
          console.log(newDevourState);
          //Below is the function to the add this new update to the list via its id.
          fetch(`/api/burgers/${id}`, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
  
            // make sure to serialize the JSON body
            body: JSON.stringify(newDevourState),
          }).then((response) => {
            // Check that the response is all good
            // Reload the page so the user can see the new burger
            if (response.ok) {
              console.log(`changed devoured to true`);
              location.reload('/');
            } else {
              alert('something went wrong!');
            }
          });
        });
      });
    }
  
    // CREATE
    // This is the button to create a new burger entry
    // Like above a const was created so that we wouldn't have to rewrite the path to the submit button everytime.
    const createBurgerBtn = document.getElementById('submit');
  console.log(createBurgerBtn)
      createBurgerBtn.addEventListener('click', (e) => {
        e.preventDefault();
  
        // Grabs the value of the textarea that goes by the name, "burger"
        // I hard coded that all the burgers are not devoured so the only input needed for the creation of a new buger is its name.
        const newBurger = {
          name: document.getElementById('new-burger').value.trim(),
        };
        console.log(newBurger);
        // Send POST request to create a new burger
        fetch('/api/burgers', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
  
          // making sure to serialize the JSON body
          body: JSON.stringify(newBurger),
        }).then(() => {
          // Empty the form
          document.getElementById('new-burger').value = '';
  
          // Reload the page so the user can see the new quote
          console.log('Created a new burger!');
          location.reload();
        });
      });
    
  
    // DELETE
        // Like above a const was created so that we wouldn't have to rewrite the path to the delete button everytime.

    const deleteBurgerBtns = document.querySelectorAll('.delete-burger');
  
    // Set up the event listeners for each delete button
    deleteBurgerBtns.forEach((button) => {
      button.addEventListener('click', (e) => {
        //in order to delete an element the element's id must be retrieved so the app knows what is being acted upon
        const id = e.target.getAttribute('data-id');
  
        // Send the delete request
        fetch(`/api/burgers/${id}`, {
          method: 'DELETE',
        }).then((res) => {
          console.log(res);
          console.log(`Deleted Burger: ${id}`);
  
          // Reload the page
          location.reload();
        });
      });
    });
  });
  