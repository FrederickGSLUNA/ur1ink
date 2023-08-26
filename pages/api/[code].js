import admin from '../../firebase'

export default async function handler (req, res) {
  const { code } = req.query
  console.log(code)

  if (!code) {
    return res.status(400).json({ error: 'Missing code' })
  }

  try {
    const db = admin.firestore()
    const urlDocRef = db.collection('urls').doc(code)
    const urlDoc = await urlDocRef.get()

    if (urlDoc.exists) {
      const { originalUrl } = urlDoc.data()
      res.writeHead(301, { Location: originalUrl })
      res.end()
    } else {
      return res.status(404).json({ error: 'Shortened URL not found' })
    }
  } catch (error) {
    console.error('Error redirecting:', error)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
