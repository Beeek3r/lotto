import {Box, Grid, Typography} from '@mui/material';
import {Close} from '@mui/icons-material';
import styled from 'styled-components';
import {Style} from '../../../theme.ts';
import {SelectNumberType} from '../DrawPicker.tsx';

interface LotteryNumberInnerButtonProps {
  number: number
  selected: boolean
  handleSelectPrimaryNumber: (number: number, type: SelectNumberType) => void
  selectNumberType: SelectNumberType
}

const NumberButton = ({number, selected, handleSelectPrimaryNumber, selectNumberType}: LotteryNumberInnerButtonProps): JSX.Element => {
  return (
    <StyledNumberButton selected={selected} onClick={() => handleSelectPrimaryNumber(number, selectNumberType)} disabled={selected}>
      <Typography fontSize={Style.FontSize.Medium} fontWeight='bold'>{number}</Typography>
      {selected && <Close color='primary' sx={{position: 'absolute', opacity: '0.2', height: '100%', width: '100%', top: 0, left: 0}}/>}
    </StyledNumberButton>
  )
}

interface DrawPickerNumberSelectorProps {
  handleSelectPrimaryNumber: (number: number, type: SelectNumberType) => void;
  selectedPrimaryNumbers: Set<number>
  selectNumberType: SelectNumberType
}

const NumberSelector = ({handleSelectPrimaryNumber, selectedPrimaryNumbers, selectNumberType}: DrawPickerNumberSelectorProps): JSX.Element => {
  /** Hardcoding 35 & 20 maximum number selection for primary and secondary as there is nothing in the payload that suggests that it could be generic  **/
  const numbers = Array.from({ length: selectNumberType === 'PRIMARY' ? 35 : 20}, (_, index) => index + 1);

  return (
    <Box>
      <Grid container columns={10} spacing={0}>
        {numbers.map((number) => (
          <Grid
            item
            xs={2}
            md={1}
            key={`draw-picker-number-selector-${selectNumberType === 'PRIMARY' ? 'primary' : 'secondary'}-item-${number}`}
            spacing={0}
            padding={0}
            data-testid={`${selectNumberType === 'PRIMARY' ? 'primary' : 'secondary'}-number-selector-${number}`}
          >
            <NumberButton number={number} selected={selectedPrimaryNumbers.has(number)} handleSelectPrimaryNumber={handleSelectPrimaryNumber} selectNumberType={selectNumberType}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

const StyledNumberButton = styled.button<{selected: boolean}>`
    position: relative;
    height: 32px;
    width: 100%;
    background-color: ${props => props.selected ? Style.Palette.PrimaryLight : "#FFFFFF"};
    color: ${Style.Palette.Primary};
    border-radius: 0;
    //cursor: pointer;
    padding: 0;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s, transform 0.1s; /* Added transform to transition */
    outline: none;
    border: none;
    margin: 0;

    &:hover {
        cursor: ${props => props.selected ? 'auto' : 'pointer'};
        ${({ selected }) => !selected && 'background-color: #f0f0f0; '}; /* Slightly darker white on hover */
    }

    &:active {
        ${({ selected }) => !selected && 'background-color: #e0e0e0; '}; /* Slightly darker white on hover */
        transform:${props => props.selected ? 'scale(1)' : 'scale(0.95)'};
    }
`;

export {NumberSelector}