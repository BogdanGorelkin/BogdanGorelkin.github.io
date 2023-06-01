import React from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import Fade from 'react-awesome-reveal'

interface Props {
  time: string
  title: string
  icon: IconProp
  left?: string
  children: React.ReactNode
}

export default function Timeline(props: Props) {
    const IconBox = styled.div({
      background: '#fff',
      fontSize: '24px',
      color: '#ff4c60',
      position: 'absolute',
      left: props.left ? props.left : '-10px',
      top: 0,
      zIndex: 1,
      fontWeight: 900
    })

    return(
      <div className="timeline-container">
        <Fade triggerOnce>
          <div className="content">
            <span className="time">{props.time}</span>
            <h3 className="title">{props.title}</h3>
            {props.children}
          </div>
        </Fade>
        <IconBox>
          <FontAwesomeIcon icon={props.icon} />
        </IconBox>
      </div>
    )
}
