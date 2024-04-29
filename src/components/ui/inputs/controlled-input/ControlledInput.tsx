import { FC } from 'react'
import { IconButton , Text  } from '@chakra-ui/react'
import { LuPlus, LuMinus } from "react-icons/lu";

interface ControlledInputProps {
    value: number,
    changeHandler: (value:number)=>void,
    input: {
        min: number,
        max: number
    }
}

const ControlledInput : FC<ControlledInputProps> = ({ value, changeHandler, input }) => {

    const increment = () => {
        if(value+1 < input.max+1) changeHandler(value+1)
    }
    const decrement = () => {
        if(value > input.min) changeHandler(value-1)
    }

    return(
        <div className='w-[60%] flex items-center gap-2.5'>
            <IconButton colorScheme='whiteAlpha' size='28px' isRound={true} variant='outline' aria-label='increment' icon={<LuPlus/>} onClick={() => increment()}>+</IconButton>
            <Text>{ value }</Text>
            <IconButton colorScheme='whiteAlpha' size='28px' isRound={true} variant='outline' aria-label='decrement' icon={<LuMinus/>} onClick={() => decrement()}>-</IconButton>
        </div>
    )
}

export default ControlledInput