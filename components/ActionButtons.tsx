import ConfirmButton from "./ConfirmButton"
import { Button } from "./ui/button"

interface ActionButtonProps {
  isConfirmed?: boolean
  onEdit?: () => void
  editLabel?: string
  onConfirm?: () => void
}

const ActionButtons: React.FC<ActionButtonProps> = ({
  isConfirmed = false,
  onEdit,
  editLabel = "Edit",
  onConfirm,
}) => {
  return (
    <div className="flex gap-2">
      {onConfirm && (
        <ConfirmButton
          isConfirmed={isConfirmed}
          onClick={() => onConfirm && onConfirm()}
        />
      )}
      {!isConfirmed && onEdit && <Button onClick={onEdit}>{editLabel}</Button>}
    </div>
  )
}

export default ActionButtons
