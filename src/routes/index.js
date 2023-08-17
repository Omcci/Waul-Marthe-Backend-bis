import { addViewToListingRoute } from "./addViewtoListing";
import { createNewListingRoute } from "./createNewListing";
import { getAllListingsRoute } from "./getAllListings";
import { getListingRoute } from "./getListing";
import { getUserListingsRoute } from "./getUserListings";
import { updateListingRoute } from "./updateListing";
import { deleteListingRoute } from "./deleteListing";

// const addViewToListingRoute = require("./addViewtoListing");
// const createNewListingRoute = require("./createNewListing");
// const getAllListingsRoute = require("./getAllListings");
// const getListingRoute = require("./getListing");
// const getUserListingsRoute = require("./getUserListings");
// const updateListingRoute = require("./updateListing");
// const deleteListingRoute = require("./deleteListing");

export default [
  // module.exports = [

  getAllListingsRoute,
  getListingRoute,
  addViewToListingRoute,
  getUserListingsRoute,
  createNewListingRoute,
  updateListingRoute,
  deleteListingRoute,
];
