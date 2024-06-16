import styled from 'styled-components';
import {Style} from '../../../theme.ts';

/** TODO: Way too many conditionals, too DRY **/
const BaseDrawNumberCircle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%; /* Makes the div a circle */
`;

const SelectedPrimaryDrawNumberCircle = styled(BaseDrawNumberCircle)`
    background-color:  ${Style.Palette.Secondary};
    color: #FFFFFF;
`;

const EmptyPrimaryDrawNumberCircle = styled(BaseDrawNumberCircle)<{next: boolean}>`
    background-color:  #FFFFFF;
    outline: ${props => props.next ? `2px solid ${Style.Palette.Secondary}` : 'inherit'};
    box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.4); /* Darker shadow on the entire circle */
`;

const SelectedSecondaryDrawNumberCircle = styled(BaseDrawNumberCircle)`
    background-color: #808080;
    color: #FFFFFF;
`;

const EmptySecondaryDrawNumberCircle = styled(BaseDrawNumberCircle)<{next: boolean}>`
    background-color:  #808080;
    outline: ${props => props.next ? `2px solid #333333` : 'inherit'};
    box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.4); /* Darker shadow on the entire circle */
`;

export {
  BaseDrawNumberCircle,
  SelectedPrimaryDrawNumberCircle,
  EmptyPrimaryDrawNumberCircle,
  SelectedSecondaryDrawNumberCircle,
  EmptySecondaryDrawNumberCircle,
}