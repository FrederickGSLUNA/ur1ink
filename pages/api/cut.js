import { v4 as uuidv4 } from 'uuid'
import admin from '../../firebase'

export default async function handler (req, res) {
  try {
    const { url } = req.body

    if (!url) {
      return res.status(400).json({ error: 'Missing URL' })
    }

    const db = admin.firestore()
    const urlCollection = db.collection('urls')

    const shortenedUrlId = uuidv4().substring(0, 6)
    const docRef = urlCollection.doc(shortenedUrlId)
    await docRef.set({ originalUrl: url })

    return res.status(201).json({ shortenedUrlId })
  } catch (error) {
    console.error('Error creating shortened URL:', error)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
