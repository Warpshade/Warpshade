//User Upgrade - Discussion
/*
	Is it worth moving more upgrade data into the user object when an upgrade is bought to speed up the main loop?
	
	Proposed action - Upgrade purchased, attaches to User-side resource/processor/user, then when the user loops through, it just has to check child items rather than reference the main upgrade object, etc.
	
	Alternatively, we could do a batch-style function for getting, array of objects for array of IDs.

*/