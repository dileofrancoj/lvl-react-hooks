import { withTracking } from './withTracking'

export const Component = (): JSX.Element => {
  return (
    <div>DemoComponent</div>
  )
}

export const DemoComponent = withTracking(Component)
