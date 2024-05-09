import express, { Request, Response } from "express";
import errorHandlingMiddleware from "./middlewares/errorHandling"; 
import authRouter from "./routes/auth";
import lineRouter from "./routes/line";
import carRouter from "./routes/car";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import {
  Strategy as GoogleStrategy,
} from 'passport-google-oauth2'
import passport from 'passport'
import secrets from "./secrets";
import db from "./db";

const app = express();
const options = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};



app.use(errorHandlingMiddleware);
app.use(bodyParser.json());
app.use(cors(options));
app.use(cookieParser());
const port = 3000;

// middleware isLodgedIn
const isLoggedIn = (req: Request, res: Response, next: any) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/google");
}

app.get("/auth/google/success", (req: Request, res: Response) => {
  console.log(req.body);
  res.send("Success");
}
);

app.get("/auth/google/failure", (req: Request, res: Response) => {
  res.send("Failure");
});

passport.use(new GoogleStrategy({
  clientID:     secrets.googleClientId,
  clientSecret: secrets.googleClientSecret,
  callbackURL: "http://localhost:3000/auth/google/callback",
  passReqToCallback   : true
},
//@ts-ignore
async function(request, accessToken, refreshToken, profile, done) {
  console.log(profile);
  const user = await db.users.findUnique({
    where: {
      email: profile.email,
    },
  })

  // Extracting profile picture from the Google profile
  let pictureUrl = profile._json.picture;

  // Trim the =s96-c suffix from the profile picture URL
  pictureUrl = pictureUrl.replace(/=s\d{1,4}-c$/, '');

  if (!user) {
    await db.users.create({
      data: {
        email: profile.email,
        name: profile.displayName,
        isVerified: true,
        password: '',
        profile: pictureUrl, // Save profile picture URL to the database
      },
    })
  }
  
  return done(null, profile);
}));



app.use(session({
  secret: 'tet',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


passport.serializeUser(function(user, done) {
  done(null, user);
}
);

passport.deserializeUser(function(obj, done) {
  //@ts-ignore
  done(null, obj);
}
);


app.get("/", (req: Request, res: Response) => {
  res.send("welcome to the train API");
});

app.use("/auth", authRouter);
app.use("/line", lineRouter);
app.use("/car", carRouter);

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/',
        failureRedirect: '/'
}));

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
