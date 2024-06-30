import { render, screen } from '@testing-library/react'
import * as React from 'react'

import { withTracking } from './withTracking'

const MockComponent = (): React.JSX.Element => <div>Mock component</div>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const intersectionObserverMock = () => ({
  observe: vi.fn(),
  unobserve: vi.fn()
})

window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock)

describe('withTracking', () => {
  it('should render base component wrapped in a div ref when component is visible', () => {
    const ComponentWithTracker = withTracking(MockComponent)
    render(<ComponentWithTracker />)
    screen.getByText('Mock component')
  })
})
