'use client'

import React, { useRef } from 'react'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

function CopyInput ({ shortUrl }) {
  const inputRef = useRef(null)

  const handleCopyClick = () => {
    if (inputRef.current) {
      inputRef.current.select()
      document.execCommand('copy')
      Toastify({
        text: 'URL Copied',
        duration: 3000,
        close: true,
        gravity: 'bottom', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: 'linear-gradient(to right, #393D42, #16191d)'
        },
        onClick: function () {} // Callback after click
      }).showToast()
    }
  }

  function getCurrentURL () {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port
    const path = window.location.pathname

    let currentURL = `${protocol}//${domain}`
    if (port) {
      currentURL += `:${port}`
    }
    currentURL += path

    return currentURL
  }

  return (
    <div className="flex justify-center">
      <input ref={inputRef} type="url" defaultValue={getCurrentURL() + shortUrl} value={getCurrentURL() + shortUrl} className="input input-bordered w-full max-w-xs" readOnly/>
      <button onClick={handleCopyClick} className="btn">Copy</button>
    </div>
  )
}

export default CopyInput
