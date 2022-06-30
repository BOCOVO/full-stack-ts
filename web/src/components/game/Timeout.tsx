import { Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

interface TimeoutProps {
  delay: number,
  outCallback: Function
}

const Timeout = ({ delay, outCallback }: TimeoutProps) => {

  const [current, setCurrent] = useState(0)

  const startCount = () => {
    const left = Math.round((delay - Date.now()) / 1000)
    if (left >= 0) {
      setCurrent(left)
    } else {
      outCallback()
    }
  }

  useEffect(() => {
    const interval = setInterval(startCount, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [current]) 

  return <Text fontWeight="bold">Timeout: {current}</Text>
}

export default Timeout
