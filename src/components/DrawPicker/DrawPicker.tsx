import {JSX, useState} from 'react';
import {Box, Typography, useMediaQuery, useTheme} from '@mui/material';
import {DrawNumbers} from './components/DrawNumbers.tsx';
import {NumberSelector} from './components/NumberSelector.tsx';
import {Style} from '../../theme.ts';
import {ActionBar} from './components/ActionBar.tsx'

interface DrawPickerProps {
  totalPrimaryNumbers: number
  totalSecondaryNumbers: number
  latestResults: {
    primary: number[]
    secondary: number[]
  }
}

export type SelectNumberType = 'PRIMARY' | 'SECONDARY'

const DrawPicker = ({totalPrimaryNumbers, totalSecondaryNumbers, latestResults} : DrawPickerProps): JSX.Element => {
  /** Possible improvements: Abstract into custom hook that provides simple breakpoints without explicit specifying media width **/
  const theme = useTheme();
  const mdBreakpointUp = useMediaQuery(theme.breakpoints.up('md'));

  const [selectedPrimaryNumbers, setSelectedPrimaryNumbers] = useState<Set<number>>(new Set())
  const [selectedSecondaryNumbers, setSelectedSecondaryNumbers] = useState<Set<number>>(new Set())

  const handleSelectNumber = (selectedNumber: number, type: SelectNumberType): void => {
    if (type === 'PRIMARY') {
      if (!selectedPrimaryNumbers.has(selectedNumber) && selectedPrimaryNumbers.size < totalPrimaryNumbers) {
        setSelectedPrimaryNumbers(prevSelectedPrimaryNumbers => {
          const updatedSelectedPrimaryNumbers = new Set(prevSelectedPrimaryNumbers)
          updatedSelectedPrimaryNumbers.add(selectedNumber)
          return updatedSelectedPrimaryNumbers
        })
      }
    }

    if (type === 'SECONDARY') {
      if (!selectedSecondaryNumbers.has(selectedNumber) && selectedSecondaryNumbers.size < totalSecondaryNumbers) {
        setSelectedSecondaryNumbers(prevSelectedSecondaryNumbers => {
          const updatedSelectedSecondaryNumbers = new Set(prevSelectedSecondaryNumbers)
          updatedSelectedSecondaryNumbers.add(selectedNumber)
          return updatedSelectedSecondaryNumbers
        })
      }
    }
  }

  const handleClearNumbers = (): void => {
    setSelectedPrimaryNumbers(new Set())
    setSelectedSecondaryNumbers(new Set())
  }

  const handlePrefillLatestResults = () => {
    setSelectedPrimaryNumbers(new Set(latestResults.primary))
    setSelectedSecondaryNumbers(new Set(latestResults.secondary))
  }

  return (
    <Box display='flex'>
        <Box>
          <Box>
            <DrawNumbers selectedPrimaryNumbers={selectedPrimaryNumbers} totalPrimaryNumbers={totalPrimaryNumbers} totalSecondaryNumbers={totalSecondaryNumbers} selectedSecondaryNumbers={selectedSecondaryNumbers}/>
            {!mdBreakpointUp && (
              <Box display='flex' color='black' width='100%' justifyContent='center' marginY='12px'>
                <ActionBar handleClearNumbers={handleClearNumbers} handlePrefillLatestResults={handlePrefillLatestResults}/>
              </Box>
            )}
          </Box>

          {/* Primary */}
          <Box marginTop='16px'>
            <NumberSelector handleSelectPrimaryNumber={handleSelectNumber} selectedPrimaryNumbers={selectedPrimaryNumbers} selectNumberType='PRIMARY'/>
          </Box>

          <Box bgcolor='#5c7c94' marginY='12px'>
            <Typography fontSize={Style.FontSize.Medium} fontWeight='bold'>SELECT YOUR POWER BALL</Typography>
          </Box>

          {/* Secondary */}
          <Box>
            <NumberSelector handleSelectPrimaryNumber={handleSelectNumber} selectedPrimaryNumbers={selectedSecondaryNumbers} selectNumberType='SECONDARY'/>
          </Box>
        </Box>
        {mdBreakpointUp && (
          <Box color='black'>
            <ActionBar handleClearNumbers={handleClearNumbers} handlePrefillLatestResults={handlePrefillLatestResults}/>
          </Box>
        )}
      </Box>
  )
}

export {DrawPicker}