'use client'

import { useEffect } from 'react'
import { themes } from './themes/themes'

export default function NavBar () {
  function changeTheme (themeName) {
    const mainElement = document.querySelector('main')
    mainElement.setAttribute('data-theme', themeName)

    localStorage.setItem('theme', themeName)
  }

  function setThemeFromLocalStorage () {
    const mainElement = document.querySelector('main')

    if (mainElement && localStorage.getItem('theme') !== null) {
      const storedTheme = localStorage.getItem('theme')
      mainElement.setAttribute('data-theme', storedTheme)
    }
  }

  useEffect(() => {
    setThemeFromLocalStorage()
  }, [])

  function capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div className="navbar bg-primary/10">
      <div className="flex-1">
        <a href='/' className="btn btn-ghost normal-case text-xl">ur1ink</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>
                Theme
              </summary>
              <ul className="p-2 bg-base-100 w-52 max-h-96 overflow-auto items-left z-10">
                {themes.map(theme => (
                  <li key={theme} data-theme={theme} className='bg-base-100 m-2 rounded'>
                    <a onClick={() => changeTheme(theme)} className='flex justify-between'>
                      <span>{capitalizeFirstLetter(theme)}</span>
                      <div className="flex h-5 flex-shrink-0 flex-wrap gap-1 bg-transparent">
                        <div className="bg-primary w-2 rounded"></div>
                        <div className="bg-secondary w-2 rounded"></div>
                        <div className="bg-accent w-2 rounded"></div>
                        <div className="bg-neutral w-2 rounded"></div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          <li><a href='https://www.buymeacoffee.com/frederickgs'>Buy me a coffe</a></li>
        </ul>
      </div>
    </div>
  )
}
