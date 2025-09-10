import React, { useMemo, useState } from 'react'
import { Link } from "react-router-dom";

export function LoadFadeLayout(props) {
  const {
    themeClass = '',
    dataBsTheme = 'light',
    dropThemeSwitch,
    paddingClass = 'px-3',
    headLinks = [
      {
        link: '/',
        title: 'Home'
      }
    ],

    children = '',

    routerNavState = 'idle'
  } = props

  const localTheme = useMemo(() => {
    try {
      const storedTheme = localStorage.getItem('liveTheme')
      return dropThemeSwitch ? storedTheme || dataBsTheme : dataBsTheme
    } catch (error) {
      console.log('🚀 ~ localTheme ~ error:', error)
      return dataBsTheme
    }
  })

  const [liveDropTheme, setLiveDropTheme] = useState(localTheme)

  const onSetLiveTheme = (themeUpdate) => {
    try {
      localStorage.setItem('liveTheme', themeUpdate)
    } catch (error) {
      console.log('🚀 ~ onSetLiveTheme ~ error:', error)
    }
    setLiveDropTheme(themeUpdate)
  }

  return (
    <div
      data-bs-theme={liveDropTheme}
      className={`layout-container d-flex ${themeClass} bg-light flex-column h-100`}
    >
      <div
        className={`d-flex layout-header align-items-center bg-dark py-1 justify-content-between ${paddingClass}`}
      >
        <div>
 
        </div>

        <div className='d-flex align-items-center '>
          {headLinks.map((linkData) => {
            const { title, link } = linkData
            return (
              <Link
              key={link}
                style={{
                  textDecoration: 'none'
                }}
                className='text-light'
                to={link}
              >
                <h1
                  style={{
                    lineHeight: 1
                  }}
                  className='m-0'
                >
                  {title}
                </h1>
              </Link>
            )
          })}


        </div>
      </div>
      <div className='padder flex-grow-1 d-flex flex-column overflow-hidden'>
        <div
          className={`flex-grow-1 ${paddingClass} pb-3  d-flex flex-column outlet-container overflow-hidden`}
        >
          {children}
        </div>

        <div
          style={{
            display: routerNavState == 'idle' ? 'none' : 'block',
            opacity: 0.7
          }}
          className='bg-secondary position-absolute top-0 h-100 w-100 left-0'
        ></div>
      </div>
    </div>
  )
}
