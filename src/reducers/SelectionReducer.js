export default (state = null,action) => {
	switch(action.type){
		case "selected_library":
			return action.payload;
		default:
			return state
	}
}