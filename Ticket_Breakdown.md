# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

#### Ticket 1: Create Table
- Create a table in the database possibly named "friendly_agents_ids", by writing the migration steps for it. This table should have four columns
		-  agent_id =  mapped to agent_id in Agents table (Data Type should of id column in agent table)
		-  facility_id =>  mapped to facility_id in Facility table (Data Type should of id column in agent table)
		-  friendly_id => Customisable by facilities (type can be string or uuid depending on how we want the user to customize it, but  this should  be unique for a facility id)

Acceptance criteria / test cases 
- Make sure that after writing migrations every test is passing and data integrity is maintained.
- For cascading options => 
	- we don't want to delete the row on the deletion of the corresponding row in the Agents table, because this is the record and facilities would want the data even if the agent is deleted from our platform.
	- On deletion of the facility, we can archive it for our records but that depends. Let's discuss it more  

Time Estimation => 2-3 hrs

#### Ticket 2: Make APIs
 - We would create two/three APIs for it
     - createFriendlyId(facility_id, agent_id, friendly_id) => takes a facility_id, agent_id, friendly_id and create a corresponding row in the database
		 Test cases: 
		 - Make sure for facility_id and agent_id combination is not present, otherwise, throw error. There can be only one row for a unique facililty_id and agent_id
		 - Make sure for a facility_id, this friendly_id is not already present. User can customize the friendly_id, we don't want the same friendly_id  for a facility id
		 - Check the agents and facilities table that the given ids are valid
		 - Check for authorizations, facility id can update only own facility id rows
		 - Check for other invalid data formats in the arguments
		 - Return appropriate HTTP codes, on success or failure
		 
    - updateFriendlyId(facility_id, agent_id, friendly_id) => takes a facility_id, agent_id, friendly_id and update the friendlyId. It can be combined in the create also, depending on how we user-id
		 Test cases:
		 -  Test cases will be the same as createFriendlyId, except we need to throw an error when the row for agent_id, and facility_id is not present

   - getFriendlyId(facility_id, agent_id) => For a facillity_id and agent_id, returns a friendly_id. 
	 Test cases:
			-  Check facility_id and agent_id is present, otherwise, throw an error
			- Same user authorization and data-type authorization as mentioned in Create API

Run integration tests, 
Time estimate = 5-8 hrs 
				  
#### Ticket 3:  Create frontend:
   Make a UI to let facilities create/update the Agent's friendly Id.
    Test cases:
       -  Make sure that you write client UI test cases
       - If a user is adding the friendly-id, add a unique salt to the friendly_id that the client generates. They should also see the output after appending the salt, so users are aware.
       - Do the client-side validation for the inputs
       
Estimate => 1 - 2 days  

#### Ticket 4: Update generateReport function
  - When generating reports, get the friendly id using getFriendlyId API to add the friendly id to the agent metadata. IF a id is not present in the the table, use the original one
    Test case:
       - Validate the response is correct
       - If a id is not present, generate with the original one
       - Handle the cases when getFriendlyId is down.

Estimate => 1-2 hr