const express = require('express')
const app = express()
mongoose.connect(CONNECTION_STRING);

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
    }
));

app.use(express.json());
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  };  
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.HTTP_SERVER_DOMAIN,
    };
  }

//   app.use(
//       session({
//         secret: "keyboard cat",
//         resave: false,
//         saveUninitialized: false,
//         proxy: true,
//         cookie: {
//           sameSite: "none",
//           secure: true,
//           domain: "localhost:,
//         },
//       })
//     );

app.get('/healthCheck', (req, res) => {res.send('Life is good!')})
app.listen(4000)