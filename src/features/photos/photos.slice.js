import { createSlice } from "@reduxjs/toolkit";
import { selectSearchTerm } from "../search/search.slice";
import photos from "./photos.data.js";

const initialState = {
	photos,
};

const options = {
	name: "photos",
	initialState,
	reducers: {
		addPhoto: (state, action) => {
			state.photos.unshift(action.payload);
		},

		removePhoto: (state, action) => {
			const photoIndex = state.photos.findIndex(
				(photo) => photo.id === action.payload
			);
			if (photoIndex !== -1) {
				state.photos.splice(photoIndex, 1);
			}
		},
	},
};

const photosSlice = createSlice(options);

export const { addPhoto, removePhoto } = photosSlice.actions;

export default photosSlice.reducer;

export const selectAllPhotos = (state) => state.photos.photos;
export const selectFilteredPhotos = (state) => {
	// Task 12: Complete `selectFilteredPhotos()` selector to return a filtered list of photos whose captions match the user's search term
	const searchTerm = selectSearchTerm(state);
	if (searchTerm) {
		return state.photos.photos.filter((photo) =>
			photo.caption.toLowerCase().includes(searchTerm.toLowerCase())
		);
	} else {
		return state.photos.photos;
	}
};
