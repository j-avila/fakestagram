import React from 'react'
import Flash from '../../assets/flash.svg'
import FlashOff from '../../assets/flashoff.svg'
import FlashAuto from '../../assets/flashauto.svg'

const FlashIcon = props => {
  const { state, styles } = props
  return (
    <>
      {state === 'on' ? (
        <Flash style={styles} height={styles.height} width={styles.width} />
      ) : state === 'auto' ? (
        <FlashAuto style={styles} height={styles.height} width={styles.width} />
      ) : (
        <FlashOff style={styles} height={styles.height} width={styles.width} />
      )}
    </>
  )
}

export default FlashIcon
