import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP)

// Mobile URL-bar show/hide shouldn't re-layout every trigger mid-scroll.
ScrollTrigger.config({ ignoreMobileResize: true })

/** Named eases so choreography reads like a shot list. */
CustomEase.create('silk', '0.45,0.05,0.55,0.95') // symmetric, for camera holds
CustomEase.create('flow', '0.33,0,0.2,1') // decisive start, long settle
CustomEase.create('reveal', '0.16,1,0.3,1') // typography entrances

export { gsap, ScrollTrigger, useGSAP }
