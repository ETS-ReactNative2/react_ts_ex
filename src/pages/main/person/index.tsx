import * as React from 'react'
import Button from '@material-ui/core/Button'

export default class Person extends React.Component<{}, {}> {

  constructor (props: any) {
    super(props)
  }

  public render () {
    return (
      <div className="main-person">
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    )
  }
}