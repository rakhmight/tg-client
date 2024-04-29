import { FC } from 'react'
import { IconButton , Text  } from '@chakra-ui/react'
import { LuPlus, LuMinus } from "react-icons/lu";

interface ControlledInputProps {
    value: number,
    changeHandler: (value:Array<LightRoundI>)=>void,
    input: {
        min: number,
        max: number
    },
    index: number,
    data: Array<LightRoundI>,
    mode: string
}

const ControlledInput : FC<ControlledInputProps> = ({ value, changeHandler, input, data, index, mode }) => {

    const increment = () => {
        const newData = [...data]
        if(value+1 < input.max+1 && mode == 'blocks') newData[index].blocksCount += 1
        if(value+1 < input.max+1 && mode == 'timer') newData[index].timer += 1
        if(value+1 < input.max+1 && mode == 'disabled-blocks') newData[index].disabledBlocks += 1
        changeHandler(newData)
    }
    const decrement = () => {
        const newData = [...data]
        if(value > input.min && mode == 'blocks') newData[index].blocksCount -= 1
        if(value > input.min && mode == 'timer') newData[index].timer -= 1
        if(value > input.min && mode == 'disabled-blocks') newData[index].disabledBlocks -= 1
        changeHandler(newData)
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