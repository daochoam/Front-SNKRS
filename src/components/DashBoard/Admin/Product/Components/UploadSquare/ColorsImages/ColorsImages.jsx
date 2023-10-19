import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import styles from './ColorsImages.module.css'
import { ICONS } from '../../../../../../../const';

const ColorsImages = ({ initColor = '', colors = [], inChangeColor = false, onSelectColor }) => {
  const [hover, setHover] = useState(false)
  const [color, setColor] = useState(null)
  const [viewColors, setViewColors] = useState(false)
  const [options, setOptions] = useState([])

  useEffect(() => {
    setOptions(colors)
  }, [colors])

  useEffect(() => {
    setColor(null)
  }, [inChangeColor])

  const handlerSelectColor = (data) => {
    let currentData = ''
    data == color ? currentData = '' : currentData = data
    setColor(currentData)
    onSelectColor(currentData)
    setViewColors(false)
  }
  const handlerViewColors = () => {
    setViewColors(!viewColors)
  }

  const handlerHoverEnter = () => { setHover(!hover) }
  const handlerHoverLeave = () => { setHover(!hover) }

  let dataColor = {}
  if (color != '') dataColor = options?.find(({ name }) => color === name)


  return (
    <div className={styles.ColorsContainer} >
      <span className={styles.ColorsHeader}>
        <span className={styles.Title}>Colors</span>
        <div className={styles.Icons}>
          {!viewColors ?
            <h4
              onMouseEnter={handlerHoverEnter}
              onMouseLeave={handlerHoverLeave}
              onClick={handlerViewColors}>{ICONS.ARROW_DOWN(!hover ? '#828282' : 'green')}</h4> :
            <h4
              onMouseEnter={handlerHoverEnter}
              onMouseLeave={handlerHoverLeave}
              onClick={handlerViewColors}
              className={styles.ArrowActive}>{ICONS.ARROW_UP(hover ? '#828282' : 'green')}</h4>
          }
        </div>
      </span>
      <div className={viewColors ? styles.PaletteColors : null} >
        {viewColors && (
          options?.map(({ name, html }, index) => {
            return (
              <div className={styles.MarkColor} key={index}>
                <button
                  title={name}
                  className={color !== name ? styles.BtnColor : styles.BtnColorActive}
                  style={{ background: `${html}` }}
                  onClick={() => handlerSelectColor(name)}
                />
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}


ColorsImages.propTypes = {
  initColor: PropTypes.string,
  inChangeColor: PropTypes.boolean,
  onSelectColor: PropTypes.func,
  colors: PropTypes.array
}

export default ColorsImages