import {Box, Stack, Typography, useMediaQuery, useTheme} from '@mui/material';
import {Style} from '../../../theme.ts';
import {SelectedSecondaryDrawNumberCircle,SelectedPrimaryDrawNumberCircle,EmptyPrimaryDrawNumberCircle,EmptySecondaryDrawNumberCircle} from './DrawNumberCircle.tsx'

interface SelectedNumbersHeaderProps {
  selectedPrimaryNumbers: Set<number>
  totalPrimaryNumbers: number
  selectedSecondaryNumbers: Set<number>
  totalSecondaryNumbers: number
}

const DrawNumbers = ({selectedPrimaryNumbers, totalPrimaryNumbers, selectedSecondaryNumbers, totalSecondaryNumbers }: SelectedNumbersHeaderProps): JSX.Element => {
  /** TODO: Abstract into custom hook that provides simple breakpoints without explicit specifying media width **/
  const theme = useTheme();
  const mdBreakpointUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box display='flex' justifyContent='center'>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }} >
        {Array.from(selectedPrimaryNumbers).map((selectedNumber) => (
          <SelectedPrimaryDrawNumberCircle style={{marginBottom: !mdBreakpointUp ? '12px' : 'inherit'}} data-testid={`primary-draw-number-item-${selectedNumber}`}>
            <Typography fontSize={Style.FontSize.Medium} fontWeight='bold'>{selectedNumber}</Typography>
          </SelectedPrimaryDrawNumberCircle>
        ))}

        {/* Render the remaining primary numbers yet to be selected. Highlight the first empty one.*/}
        {Array.from({length: totalPrimaryNumbers - selectedPrimaryNumbers.size}).map((_, index) => (
          <EmptyPrimaryDrawNumberCircle next={index === 0} style={{marginBottom: !mdBreakpointUp ? '12px' : 'inherit'}} data-testid={`primary-draw-number-item-empty`}/>
        ))}

        {Array.from(selectedSecondaryNumbers).map((selectedNumber) => (
          <SelectedSecondaryDrawNumberCircle style={{marginBottom: !mdBreakpointUp ? '12px' : 'inherit'}} data-testid={`secondary-draw-number-item-${selectedNumber}`}>
            <Typography fontSize={Style.FontSize.Medium} fontWeight='bold'>{selectedNumber}</Typography>
          </SelectedSecondaryDrawNumberCircle>
        ))}

        {/* Render the remaining primary numbers yet to be selected. Highlight the first empty one if there are multiple secondary numbers */}
        {Array.from({length: totalSecondaryNumbers - selectedSecondaryNumbers.size}).map((_, index) => (
          <EmptySecondaryDrawNumberCircle next={index === 0 && totalSecondaryNumbers > 1} style={{marginBottom: !mdBreakpointUp ? '12px' : 'inherit'}} data-testid={`secondary-draw-number-item-empty`}>
            <Typography fontSize={Style.FontSize.Medium} fontWeight='bold'>PB</Typography>
          </EmptySecondaryDrawNumberCircle>
        ))}
      </Stack>
    </Box>
  )
}

export {
  DrawNumbers
}