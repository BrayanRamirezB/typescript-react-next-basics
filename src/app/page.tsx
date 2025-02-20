'use client'
import {
  CSSProperties,
  ReactNode,
  SetStateAction,
  useState,
  Dispatch,
  ComponentPropsWithoutRef,
  MouseEvent
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

// Para extender propiedades usa & seguido de las propiedades
type SocialPillProps = ComponentPropsWithoutRef<'button'>

type SocialPillExtendedProps = SocialPillProps & {
  dark?: boolean
  variant?: 'filled' | 'outlined'
  children: string // Si escribes una propiedad ya existente, se sobreescribe la propiedad
}

const SocialPill = ({ onClick, ...props }: SocialPillExtendedProps) => {
  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault()
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

// Tipado de hooks
const UserComponent = () => {
  type UserProps = {
    name: string
    age: number
    email: string
    password: string
  }

  // Utility types
  // omite una propiedad
  // type UserWithoutPassword = Omit<UserProps, "password">

  // Todos los props son opcionales
  // type UpdateUser = Partial<UserProps>

  // Tomar ciertos props
  // type PublicUserData = Pick<UserProps, "name" | "email">

  // Hace opcional el typo UserWithoutPassword
  // type OptionalUserWithoutPassword = Partial<UserWithoutPassword>

  // type Status = 'loading' | 'success' | 'error'

  // Crea un type apartir de otro, excluyendo un tipo
  // type AllowedStatus = Exclude<Status, "loading">

  const [user, setUser] = useState<UserProps | null>(null)

  const handleUserChange = () => {
    setUser(user)
  }

  // Si existe user, mostrar el nombre
  return <span onClick={handleUserChange}>{user?.name}</span>
}

// type generic
function identity<T>(x: T): T {
  return x
}

function getFirstElement<T>(arr: T[]) {
  return arr[0]
}

// type ApiResponse<T> = {
//   status: number
//   data: T
// }

// const reponse1: ApiResponse<{name: string; age: number}> = {
//   status: 200,
//   data: {
//     name: 'John Doe',
//     age: 30
//   }
// }

const Page = () => {
  const [count, setCount] = useState<number>(0)

  // define el tipo de dato al invocar la función
  identity<number>(2)
  identity<string>('hello')

  // detecta el tipo de dato
  getFirstElement([1, 2, 3])
  getFirstElement(['hello', 'world'])

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Button title='Hello World' count={count} setCount={setCount}>
        {count}
      </Button>
      <Link>Next.js</Link>
      <SocialPill onClick={() => alert('hello')}>hello world</SocialPill>
      <UserComponent />
    </div>
  )
}

export default Page
