'use client'
import QRCode from 'react-qr-code'
import { useState } from 'react'
import CopyInput from './CopyInput'
import { getCurrentURL } from '../utils/getCurrentURL'

export default function Form () {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch('/api/cut', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      })

      if (response.ok) {
        const data = await response.json()
        setShortUrl(data.shortenedUrlId)
        console.log(data.shortenedUrlId)
      } else {
        console.error('Error al acortar la URL')
      }
    } catch (error) {
      console.error('Error de red:', error)
    }
  }

  return (
    <>
      <article className='grid grid-col-2 w-full h-full gap-12 justify-center'>
        <div className='prose prose-sm w-full'>
          <h1 className='text-3xl md:text-5xl font-bold'>URL Shortener</h1>
          <h2 className='text-lg md:text-2xl'>Shorten your URLs quickly and easily</h2>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-full justify-center md:px-4'>
          <label className="label">
            <span className="label-text">Original URL</span>
          </label>
          <div className='flex gap-2'>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="url"
              placeholder="https://example.com/"
              className="input input-bordered w-full max-w-xs"
          />
            <button className='btn btn-primary'>Shorten</button>
          </div>
        </form>
        {
          shortUrl && <CopyInput shortUrl={shortUrl}/>
        }
      </article>
      <aside className='flex items-center justify-center w-full p-20 lg:pr-20'>
        <div className="mockup-browser border border-base-300 w-full">
          <div className="mockup-browser-toolbar">
            <div className="input border border-base-300">{getCurrentURL() + shortUrl || 'https://ur1.ink'}</div>
          </div>
          <div className="flex justify-center px-4 py-16 border-t border-base-300">
            <div className='w-40'>
              <QRCode
                className='bg-base-100 p-2 border-2 rounded'
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={getCurrentURL() + shortUrl || 'https://ur1.ink'}
                viewBox={'0 0 256 256'}
                title={getCurrentURL() + shortUrl || 'https://ur1.ink'}
                level='H'
    />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
