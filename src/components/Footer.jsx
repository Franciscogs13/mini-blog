import React from 'react'

//css
import Styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className={Styles.footer}>
      <h3>
        Escreva sobre o que você tem interesse!
      </h3>
      <p>Mini Blog &copy; 2024</p>
    </footer>
  )
}

export default Footer