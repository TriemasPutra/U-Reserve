import fs from 'fs';

export default async function signIn(req, res) {
  console.log(req, res)
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const dataFilePath = './data/dummy.json';
      const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

      if (email in data) {
        if (data[email].password === password) {
          // User found, return success
          console.log('email found')
          res.status(200).json({ success: true });
        } else {
          // Password does not match
          res.status(401).json({ error: 'Wrong Password.' });
        }
      } else {
        // Invalid credentials
        res.status(401).json({ error: 'Invalid credentials.' });
      }
    } catch (error) {
      console.log('Error occurred:', error);
      // Something went wrong
      res.status(500).json({ error: 'Something went wrong.' });
    }
  } else {
    console.log('Method not allowed')
    // Method not allowed
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
