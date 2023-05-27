const { deterministicPartitionKey, TRIVIAL_PARTITION_KEY, encryptData } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const partitionKey = deterministicPartitionKey();
    expect(partitionKey).toBe(TRIVIAL_PARTITION_KEY);
  });
  
  it("When partition key is present, return that", () => {
    const event = {
      partitionKey: "partitionKey"
    }
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(event.partitionKey);
  });

  it("When partition key is not present, return a hash of the event", () => {
    const event = {
      foo: 'bar'
    }
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(encryptData(JSON.stringify(event)));
  });
 
  // TODO: Add it in false value
  it("When event is empty value, partition key should be trivial", () => {
    const event = ''
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(TRIVIAL_PARTITION_KEY);
  });

  it("When event is 0, partition key should be trivial", () => {
    const event = 0
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(TRIVIAL_PARTITION_KEY);
  });
  
  it("When event is falsy, partition key should be trivial", () => {
    const event = null
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(TRIVIAL_PARTITION_KEY);
    
    const eventFalse = false
    const partitionKeyFalse = deterministicPartitionKey(eventFalse);
    expect(partitionKeyFalse).toBe(TRIVIAL_PARTITION_KEY);
  });

  //TODO: write error case

});
