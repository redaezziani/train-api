import express, { Request, Response } from "express";
import errorHandlingMiddleware from "./middlewares/errorHandling";
import authRouter from "./routes/auth";
import lineRouter from "./routes/line";
import carRouter from "./routes/car";
import trainRouter from "./routes/train";
import seatRouter from "./routes/seat";
import tripRouter from "./routes/trip";
import ticketRouter from "./routes/ticket";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import secrets from "./secrets";
import db from "./db";
import { sign } from "jsonwebtoken";

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

// Configure express-session to use cookies
app.use(session({
  secret: secrets.sessionSecret,
  resave: false,
  saveUninitialized: true,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware to check if the user is logged in
const isLoggedIn = (req: Request, res: Response, next: any) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/google");
}

// Google authentication strategy
passport.use(new GoogleStrategy({
  clientID: secrets.googleClientId,
  clientSecret: secrets.googleClientSecret,
  callbackURL: "http://localhost:3000/api/auth/google/callback",
  passReqToCallback: true
},
async function(request: any, accessToken: any, refreshToken: any, profile: { email: any; displayName: any; photos: { value: any; }[]; }, done: (arg0: unknown, arg1: string | undefined) => any) {
  try {
    let user = await db.users.findUnique({
      where: { email: profile.email },
    });

    if (!user) {
      user = await db.users.create({
        data: {
          email: profile.email,
          name: profile.displayName,
          isVerified: true,
          password: '',
          profile: profile.photos[0].value, // Use the first photo as profile picture
        },
      });
    }

    // Create a JWT token
    const token = sign({
      id: user.id,
      email: profile.email,
      picture: profile.photos[0].value, // Use the first photo as profile picture
      name: profile.displayName,
      role: user.role,
    }, secrets.jwtSecret, {
      expiresIn: secrets.jwtExpiration,
    });

    return done(null, token);
  } catch (error) {
    return done(error, undefined);
  }
}));

// Serialize and deserialize user sessions
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser((obj:any, done) =>{
  done(null, obj);
});

// API routes
app.get("/api", (req: Request, res: Response) => {
  res.send("Welcome to the train API");
});

app.use("/api/auth", authRouter);
app.use("/api/line", lineRouter);
app.use("/api/car", carRouter);
app.use("/api/train", trainRouter);
app.use("/api/seat", seatRouter);
app.use("/api/trip", tripRouter);
app.use("/api/ticket", ticketRouter);

// Google authentication routes
app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/api/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api/auth/google/failure',
    successRedirect: '/api/auth/google/success',
  })
);

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
