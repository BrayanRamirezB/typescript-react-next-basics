'use client'
import {
  CSSProperties,
  ReactNode,
  SetStateAction,
  useState,
  Dispatch,
  ComponentPropsWithoutRef
} from 'react'

// Type funciona como un tipo de dato individual o un objeto
type Color = 'blue' | 'red' | 'green' | 'yellow' | 'purple'

// Interface es para objetos
interface ButtonProps {
  title: string
  text?: string
  color?: Color
  backgroundColor?: Color
  padding?: ['top', 'left', 'right'?, 'bottom'?]
  style?: CSSProperties
  buttonContent?: Record<1 | 2 | 3 | number, string> // key, subtitle
  onClick?: () => void
  children?: ReactNode
  setCount: Dispatch<SetStateAction<number>> // hook
  count?: number
}

const Button = ({ children, count = 0, setCount }: ButtonProps) => {
  return (
    <button
      onClick={() => setCount(count + 1)}
      className='bg-blue-500 text-neutral-100 font-bold px-4 py-2 rounded-lg'
    >
      {children}
    </button>
  )
}

type LinkProps = ComponentPropsWithoutRef<'a'> // No incluye useRef()

const Link = ({ children, href, target }: LinkProps) => {
  return (
    <a href={href} className='text-blue-500 underline' target={target}>
      {children}
    </a>
  )
}

type SocialPillProps = ComponentPropsWithoutRef<'button'>

const SocialPill = ({ onClick, ...props }: SocialPillProps) => {
  const handleClick = () => {
    if (onClick) {
      alert('Hello World')
    }
  }

  return (
    <button
      onClick={handleClick}
      {...props}
      className='bg-blue-500 text-neutral-100'
    />
  )
}

const Page = () => {
  const [count, setCount] = useState<number>(0)

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Button title='Hello World' count={count} setCount={setCount}>
        {count}
      </Button>
      <Link>Next.js</Link>
      <SocialPill onClick={() => alert('hello')}>hello world</SocialPill>
    </div>
  )
}

export default Page
