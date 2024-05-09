"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const passport_google_oauth2_1 = require("passport-google-oauth2");
const passport_1 = __importDefault(require("passport"));
const secrets_1 = __importDefault(require("./secrets"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
const options = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
};
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)(options));
const port = 3000;
// middleware isLodgedIn
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/auth/google");
};
app.get("/auth/google/success", (req, res) => {
    console.log(req.body);
    res.send("Success");
});
app.get("/auth/google/failure", (req, res) => {
    res.send("Failure");
});
passport_1.default.use(new passport_google_oauth2_1.Strategy({
    clientID: secrets_1.default.googleClientId,
    clientSecret: secrets_1.default.googleClientSecret,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
}, 
//@ts-ignore
function (request, accessToken, refreshToken, profile, done) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(profile);
        const user = yield db_1.default.users.findUnique({
            where: {
                email: profile.email,
            },
        });
        // Extracting profile picture from the Google profile
        let pictureUrl = profile._json.picture;
        // Trim the =s96-c suffix from the profile picture URL
        pictureUrl = pictureUrl.replace(/=s\d{1,4}-c$/, '');
        if (!user) {
            yield db_1.default.users.create({
                data: {
                    email: profile.email,
                    name: profile.displayName,
                    isVerified: true,
                    password: '',
                    profile: pictureUrl, // Save profile picture URL to the database
                },
            });
        }
        return done(null, profile);
    });
}));
app.use((0, express_session_1.default)({
    secret: 'tet',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser(function (obj, done) {
    //@ts-ignore
    done(null, obj);
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/auth", auth_1.default);
app.get('/auth/google', passport_1.default.authenticate('google', { scope: ['email', 'profile'] }));
app.get('/auth/google/callback', passport_1.default.authenticate('google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure'
}));
app.listen(port, () => {
    console.log(`Server started at ${port}`);
});
