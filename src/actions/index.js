export const selectLibrary = (libraryId) => {
	return {
		type: 'selected_library',
		payload: libraryId,
	};
};