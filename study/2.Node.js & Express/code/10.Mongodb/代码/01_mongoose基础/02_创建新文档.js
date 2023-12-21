const mongoose = require('mongoose');

// Set strictQuery to true
mongoose.set('strictQuery', true);

// step 1.Connect to MongoDB
const username = 'admin';
const password = '123456';
const dbUrl = `mongodb://${username}:${password}@127.0.0.1:27017/bookSystem`;

async function connectToDatabase() {
  try {
    await mongoose.connect(dbUrl);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}

// step 2.Define Book Schema
const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
});

// step 3.Create Book Model
const BookModel = mongoose.model('Book', bookSchema);

// step 4.Add a book to the database
async function addBook() {
  try {
    const newBook = await BookModel.create({
      name: '西游记',
      author: '吴承恩',
      price: 19.9,
    });

    console.log('Book created successfully:', newBook);
  } catch (error) {
    console.error('Error creating book:', error);
  }
}

// step 5.Close database connection
async function closeConnection() {
  try {
    await mongoose.disconnect();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error closing connection:', error);
  }
}

// Event listeners for connection events
mongoose.connection.on('error', (err) => {
  console.error('Connection error:', err);
});

mongoose.connection.on('close', () => {
  console.log('Connection closed:onClose');
});

// Connect to the database and perform operations
(async () => {
  await connectToDatabase();
  await addBook();
  await closeConnection();
})();
