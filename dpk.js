const crypto = require("crypto");

//TODO: Save them in constants file
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;
const HASH_ALGORITHM = "sha3-512";
const HASH_ENCODING = "hex";
//TODO: export from different file
exports.TRIVIAL_PARTITION_KEY = TRIVIAL_PARTITION_KEY

//TODO: Save it in util folder
const encryptData = (data) => {
  TODO:// if data is not binary like, throw error
  return crypto.createHash(HASH_ALGORITHM).update(data).digest(HASH_ENCODING);
}
//TODO: export from different file
exports.encryptData = encryptData;

exports.deterministicPartitionKey = (event) => {
  
  // if event is nor present
  if (!event) {
    return TRIVIAL_PARTITION_KEY
  }
  
  // JSON.stringify can throw error, make sure to log it and return the custom error
  try {
    // If the event has a partitionKey use that as the candidate, otherwise crete a hash of the event
    let partitionKeyCandidate =  event.partitionKey ? event.partitionKey : encryptData(JSON.stringify(event));    
  
    /* 
      Make sure the partitionKey candidate is a string. If it is not a string, if not convert it to string.
    */
    partitionKeyCandidate = typeof partitionKeyCandidate !== 'string' ? JSON.stringify(partitionKeyCandidate) : partitionKeyCandidate;
    
    /* 
      Make sure the partitionKey candidate is not longer than the maximum allowed length. If it is longer than the maximum allowed length, encrypt it it further.
    */
    partitionKeyCandidate = partitionKeyCandidate.length > MAX_PARTITION_KEY_LENGTH ? encryptData(partitionKeyCandidate) : partitionKeyCandidate;
    
    return partitionKeyCandidate;
  } catch(e) {
    // log error
    throw new Error('custom message =>  e')
  }
};