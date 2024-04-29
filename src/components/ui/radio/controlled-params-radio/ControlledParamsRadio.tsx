import { FC, useState } from 'react'
import { Radio, RadioGroup, Stack, IconButton } from '@chakra-ui/react'
import { MdCancel } from "react-icons/md";

interface ControlledParamsRadioProps {
    changeHandler: (value:Array<LightRoundI>)=>void,
    index: number,
    data: Array<LightRoundI>,
}

const ControlledParamsRadio : FC<ControlledParamsRadioProps> = ({ data, index, changeHandler }) => {

    const [value, setValue] = useState<undefined | string>(undefined)

    const choiceSpecial = (special: string) => {
        setValue(special)

        const newData = [...data]
        if(special == 'nullable' && value!='nullable'){
            newData[index].zeroBlocks = true
            newData[index].pseudoZeroBlocks = false
        }
       if(special == 'pseudo' && value != 'pseudo'){
            newData[index].pseudoZeroBlocks = true
            newData[index].zeroBlocks = false
        }
        changeHandler(newData)
    }

    const resetSpecial = () => {
        setValue('')
        const newData = [...data]
        newData[index].zeroBlocks = false
        newData[index].pseudoZeroBlocks = false
        changeHandler(newData)
    }

    return(
        <RadioGroup onChange={choiceSpecial} value={value}>
            <Stack direction='row'>
                <Radio value='nullable'>нулевые</Radio>
                <Radio value='pseudo'>псевдо</Radio>
                <IconButton colorScheme='red' size='small' isRound={true} variant='outline' aria-label='decrement' icon={<MdCancel/>} onClick={resetSpecial} />
            </Stack>
        </RadioGroup>
    )
}

export default ControlledParamsRadio