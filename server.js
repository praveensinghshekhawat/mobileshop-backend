try {
    const express = require('express');
    require('dotenv').config();
    const app = express();
  
    const PORT = process.env.PORT || 3000;
  
    app.use(express.json());
  
    app.get('/', (req, res) => {
      res.send('📱 MobileShop backend is running!');
    });
  
    const usersRoute = require('./routes/users'); // ⬅️ Is line ko try me rakh
    app.use('/api/users', usersRoute);
  
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  
  } catch (err) {
    console.error('❌ Startup Error:', err.message);
  }
  