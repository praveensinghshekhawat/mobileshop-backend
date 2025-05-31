const pool = require('../db/db');

//INSERT INTO users (name, phone) VALUES ('Praveen Singh', '9876543210');
//SELECT * FROM users ORDER BY id DESC;





// Get all users
// router.get('/', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM users ORDER BY id DESC');
//     if (result.rows.length === 0) {
//         return res.status(201).json({ error: 'User not found' });
//       }
//     res.json(result.rows);
// //    res.json([{ id: 1, name: 'Test User', phone: '1234567890' }]);
//   } catch (err) {
//     console.error('Error in GET /api/users:', err);  // <-- Add this line
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// });

// Get all users function
const getUsers = async (req, res) => {
  //  console.log("🚀 code updated");
    try {
      const result = await pool.query('SELECT * FROM users ORDER BY id DESC');
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(result.rows);
      //    res.json([{ id: 1, name: 'Test User', phone: '1234567890' }]);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
  

// Create user
// router.post('/', async (req, res) => {
//   const { name, phone } = req.body;
//   try {
//     const result = await pool.query(
//       'INSERT INTO users (name, phone) VALUES ($1, $2) RETURNING *',
//       [name, phone]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// });

// Create user using query params
// router.post('/', async (req, res) => {
//     const { name, phone } = req.query;  // <-- query params yahan se milenge
//     if (!name || !phone) {
//       return res.status(400).json({ error: 'Name and phone are required' });
//     }
//     try {
//       const result = await pool.query(
//         'INSERT INTO users (name, phone) VALUES ($1, $2) RETURNING *',
//         [name, phone]
//       );
//       res.status(201).json(result.rows[0]);
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to create user' });
//     }
//   });


  // Add user function
const addUsers = async (req, res) => {
    const { name, phone } = req.query;  // <-- query params yahan se milenge
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }
    try {
      const result = await pool.query(
        'INSERT INTO users (name, phone) VALUES ($1, $2) RETURNING *',
        [name, phone]
      );
      res.status(200).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  };

  // Delete user
  const deleteUser = async (req, res) => {
    const { id } = req.query;  // <-- user ID query param se milega
    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }
  
    try {
      const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'User not found or already deleted' });
      }
  
      res.status(200).json({ message: 'User deleted successfully', deletedUser: result.rows[0] });
    } catch (err) {
      console.error('Error in deleteUser:', err);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  };

  module.exports = {
    getUsers,
    addUsers,
    deleteUser
  };