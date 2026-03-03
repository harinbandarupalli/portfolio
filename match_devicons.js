const fs = require('fs');
const https = require('https');

https.get('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => {
    const matches = data.match(/\.devicon-[a-z0-9]+-plain/g) || [];
    const unique = [...new Set(matches.map(m => m.replace('.devicon-', '').replace('-plain', '')))];
    
    const targets = ['cucumber', 'maven', 'junit', 'amazon', 'aws', 'dynamodb', 'ecs', 's3', 'aurora', 'sns', 'sqs', 'api', 'gateway', 'cloudformation', 'microservices', 'kinesis', 'woodpecker', 'gitlab'];
    
    targets.forEach(t => {
      const found = unique.filter(u => u.includes(t) || t.includes(u));
      console.log(`Target ${t}: ${found.join(', ')}`);
    });
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
