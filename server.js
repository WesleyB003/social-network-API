const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// I was having an issue with my Mongodb, when I was looking on their website (mongodb.com) I found this little solution.
// I changed localhost to 127.0.0.1
//https://www.mongodb.com/community/forums/t/econnrefused-27017/131911
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-API', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));