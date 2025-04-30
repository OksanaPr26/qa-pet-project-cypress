const { defineConfig } = require('cypress');
const Mailosaur = require('mailosaur');  

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://passport.amazon.jobs/',
    env: {
         homePageUrl: 'https://www.amazon.jobs/en/',
         accountPageUrl: 'https://account.amazon.jobs'         
    },

    chromeWebSecurity: false, 
    experimentalSessionAndOrigin: true,
    
    viewportWidth: 1400,
    viewportHeight: 1200,

    setupNodeEvents(on, config) {
      on('task', {
        async getMailosaurOTP(email) {
          const mailosaur = new Mailosaur(config.env.apiKey); 

          try {
            const emailMessage = await mailosaur.messages.get(
              config.env.serverId,    
              { sentTo: email }, 
              { timeout: 30000 } 
            );

            if (!emailMessage) return null;

            const otpMatch = emailMessage.html.body.match(/\b\d{6}\b/);
            return otpMatch ? otpMatch[0] : null;
          } catch (error) {
            console.error('Mailosaur error:', error);
            return null;
          }
        },
      });

      return config;
    },
  },
});