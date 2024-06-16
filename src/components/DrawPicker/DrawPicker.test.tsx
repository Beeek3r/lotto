import {DrawPicker} from './DrawPicker.tsx';
import {render, screen, fireEvent} from '@testing-library/react';
import {expect, describe} from 'vitest';

describe('DrawPicker', () => {
  it('component should render', () => {
    const component = render(<DrawPicker totalPrimaryNumbers={1} totalSecondaryNumbers={1} latestResults={{primary: [2], secondary: [3]}} />)
    expect(component).not.toBe(null)
  });

  /** Recommended to add another test for checking the secondary numbers **/
  it('component should render the appropriate number of primary numbers that can be selected (default 35)', () => {
    render(<DrawPicker totalPrimaryNumbers={1} totalSecondaryNumbers={1} latestResults={{primary: [2], secondary: [3]}} />)
    const results = screen.getAllByTestId('primary-number-selector', {exact: false})
    expect(results.length).toEqual(35)
  });

  it('component should render the appropriate number of primary and secondary numbers (the header part)', () => {
    const latestResults = {primary: [1,2,3], secondary: [3]}

    render(<DrawPicker totalPrimaryNumbers={latestResults.primary.length} totalSecondaryNumbers={latestResults.secondary.length} latestResults={latestResults} />)
    const primaryDrawNumberItems = screen.getAllByTestId('primary-draw-number-item', {exact: false})
    const secondaryDrawNumberItems = screen.getAllByTestId('secondary-draw-number-item', {exact: false})

    expect(primaryDrawNumberItems).toHaveLength(latestResults.primary.length)
    expect(secondaryDrawNumberItems).toHaveLength(latestResults.secondary.length)
  });

  /** Recommended to add another test for clearing the numbers **/
  it('component should prefill the primary draw numbers (the header part) with the latest results', () => {
    const latestResults = {primary: [5,3,22], secondary: [3]}
    render(<DrawPicker totalPrimaryNumbers={latestResults.primary.length} totalSecondaryNumbers={latestResults.secondary.length} latestResults={latestResults} />)

    /** Ensure that all draw numbers are empty **/
    const prePrimaryDrawNumberItems = screen.getAllByTestId('primary-draw-number-item-empty', {exact: false})
    const preSecondaryDrawNumberItems = screen.getAllByTestId('secondary-draw-number-item-empty', {exact: false})
    expect(prePrimaryDrawNumberItems).toHaveLength(latestResults.primary.length)
    expect(preSecondaryDrawNumberItems).toHaveLength(latestResults.secondary.length)

    /** Click prefill button **/
    const button = screen.getByTestId('action-bar-prefill-latest-results-button')
    fireEvent.click(button);

    /** Validate if draw numbers were prefilled **/
    latestResults.primary.forEach((primaryNumber) => {
      const primaryDrawNumberElement = screen.getByTestId(`primary-draw-number-item-${primaryNumber}`, {exact: true})
      expect(primaryDrawNumberElement).not.toBe(null)
    })

    latestResults.secondary.forEach((secondaryNumber) => {
      const primaryDrawNumberElement = screen.getByTestId(`primary-draw-number-item-${secondaryNumber}`, {exact: true})
      expect(primaryDrawNumberElement).not.toBe(null)
    })
  });
})