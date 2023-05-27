# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

- Remove the magic values. Some values like algorithm type and hex-encoding should be constant and customizable. So make sense to abstract them
- Write test cases for falsy values, when the partition key is not present and when everything is working fine
- Try to remove nested if loop by abstracting the falsy event case
- Rename the variable name "candidate" to "partitionKeyCandidate". It makes it clear
- Json.stringify can throw errors. So log that error and sent a custom error or the same error back
- Abstract the encryption function
- Use the constants in test cases to assert