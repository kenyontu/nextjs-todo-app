import classNames from 'classnames'

import styles from './Checkbox.module.css'
import Button from './Button'

type Props = {
  isChecked: boolean
  onToggle: VoidFunction
}

function Checkbox({ isChecked, onToggle }: Props) {
  return (
    <Button data-testid="checkbox" aria-label="Checkbox" onClick={onToggle}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 border border-gray-500 rounded"
        viewBox="0 0 105 105"
      >
        <polyline
          data-testid="check"
          className={classNames(styles.check, { [styles.checked]: isChecked })}
          points="25,50 40,70 80,35"
        />
      </svg>
    </Button>
  )
}

export default Checkbox
