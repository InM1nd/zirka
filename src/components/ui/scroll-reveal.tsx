"use client"

import { cn } from "@/lib/utils"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade"
  duration?: number
  distance?: number
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.6,
  distance = 30,
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    amount: 0.3
  })

  const getVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }
      }
    }

    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: distance },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              duration,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }
          }
        }
      case "down":
        return {
          hidden: { opacity: 0, y: -distance },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              duration,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }
          }
        }
      case "left":
        return {
          hidden: { opacity: 0, x: distance },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: {
              duration,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }
          }
        }
      case "right":
        return {
          hidden: { opacity: 0, x: -distance },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: {
              duration,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }
          }
        }
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
              duration,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }
          }
        }
      case "fade":
        return baseVariants
      default:
        return baseVariants
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getVariants()}
      className={cn("animate-on-scroll", className)}
      style={{ 
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
        perspective: "1000px"
      }}
    >
      {children}
    </motion.div>
  )
}
