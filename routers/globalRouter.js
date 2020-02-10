import express from "express";
import passport from "passport";
import routes from "../routes";
import { homeController, search } from "../controllers/videoController";
import {
  getMe,
  logout,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  githubLogin,
  postGithubLogIn,
  facebookLogin,
  postFacebookLogin
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, homeController);
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

globalRouter.get(routes.github, githubLogin);

globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", {
    failureRedirect: "/login"
  }),
  postGithubLogIn
);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", {
    failureRedirect: "/login"
  }),
  postFacebookLogin
);

globalRouter.get(routes.me, getMe);

export default globalRouter;
