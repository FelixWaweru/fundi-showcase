const { AsyncSeriesHook } = require('tapable');

let fundiV1 = 'https://fundi-run-test-5evy5m7huq-uc.a.run.app';
let res = '';

class CodeFundi {
  constructor({ userId, apiKey }) {
    this.userId = userId;
    this.apiKey = apiKey;
    this.asyncSeriesHook = new AsyncSeriesHook(['stats']);
  }

  apply(compiler) {
    compiler.hooks.done.tapAsync('CodeFundi', async (stats, callback) => {

      if (stats.hasErrors()) {
        const errors = stats.toJson().errors;

        console.log('\x1b[31m CodeFundi 👷‍♂️: Build finished with errors. Debugging... \x1b[0m \n');
        
        // Use Promise.all to await all asynchronous calls
        const results = await Promise.all(
          errors.map(async (error) => {
            // Execute API call on failed compilation
            const result = await this.debug(this.userId, this.apiKey, error.message);

            console.log('\x1b[31m Debugged Error: \x1b[0m \n');
            console.log(`\x1b[32m ${result} \x1b[0m`);
            return result;
          })
        );

        // Trigger the AsyncSeriesHook with the stats object
        this.asyncSeriesHook.callAsync(stats, (err) => {
          if (err) {
            console.error('AsyncSeriesHook failed:', err);
          }

          // Callback to signal completion
          callback();
        });

      } else {
        callback(); // Signal completion when there are no errors
      }
    });
  }

  // Code Fundi Debug function
  async debug(userId, apiKey, error) {
    let data = {
      user_id: userId,
      api_key: apiKey,
      code_block: error,
      embed: false,
    };

    try {
      const response = await fetch(`${fundiV1}/v1/fundi/debug`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Content-Type-Options': 'nosniff',
        },
        body: JSON.stringify(data),
      });

      const reader = response.body.getReader();

      return new Promise((resolve) => {
        async function read() {
          const { done, value } = await reader.read();

          if (done) {
            // Stream finished, perform any necessary actions
            resolve(res.trim());
            return;
          }

          const chunk = new TextDecoder('utf-8').decode(value);
          res = res + chunk;

          read();
        }

        read(); // Start the read operation
      });
    } catch (error) {
      console.error('Request error:', error);
    }
  }
}

module.exports = CodeFundi;
