//Dependencies
const express = require('express');

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require('../models/burger.js');

// Create all our routes and set up logic within those routes where required.
// The code below gets our burger data and displays it
router.get('/', (req, res) => {
  burger.all((data) => {
    const hbsObject = {
      burgers: data,
    };
    console.log(hbsObject);
    res.render('index', hbsObject);
  });
});

//The code below  is the route to posting a new burger. I made devoured false the default in the schema so a user only needs to add a burger name to create a new input.
router.post('/api/burgers', (req, res) => {
  burger.create(['burger_name'], [req.body.name], (result) => {
    // Send back the ID of the new quote
    res.json(result);
  });
});
//The code below is to change the state of devoured. The first part grabs the data by it's id then updates its devoured state.
router.put('/api/burgers/:id', (req, res) => {
  const condition = `id = ${req.params.id}`;

  console.log('condition', condition);

  burger.update(
    {
      devoured: req.body.devoured
    },
    condition,
    (result) => {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});
//The code below is to delete the burger. It grabs the burger by it's id then deletes only that input.
router.delete('/api/burgers/:id', (req, res) => {
  const condition = `id = ${req.params.id}`;

  burger.delete(condition, (result) => {
    if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

// Export routes for server.js to use.
module.exports = router;
