import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './src'

describe('App', () => {
  test('Input works correctly', async () => {
    render( </html/> )
    userEvent.type(screen.getByTestId("testInput"), "UCD")
    userEvent.click(screen.getByText("Print input"))
    expect(screen.getByText("Spire")).toBeInTheDocument()
    userEvent.click(screen.getByText("Print input"))
    expect(screen.queryByText("Testing the test")).not.toBeInTheDocument()
  })
})