import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Mock Database
const bookings = [];

// API Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'AstroSrijan Backend is Live', timestamp: new Date() });
});

app.post('/api/bookings', (req, res) => {
  const bookingData = req.body;
  
  if (!bookingData.email || !bookingData.serviceId) {
    return res.status(400).json({ error: 'Missing required booking information' });
  }

  // In a real app, this would save to MongoDB/PostgreSQL
  const newBooking = {
    id: Date.now().toString(),
    ...bookingData,
    createdAt: new Date()
  };
  
  bookings.push(newBooking);
  console.log('New booking received:', newBooking);
  
  res.status(201).json({ 
    message: 'Booking successfully registered', 
    bookingId: newBooking.id 
  });
});

app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

// Start Server (Conceptual for this environment)
// app.listen(PORT, () => {
//   console.log(`Backend running on http://localhost:${PORT}`);
// });

export default app;