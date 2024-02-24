import React from "react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"


interface StepEditorProps {
  line: string
  onSave: () => void
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  onDelete: () => void
  onAdd?: () => void
}

const StepEditor: React.FC<StepEditorProps> = ({
  line,
  onSave,
  onChange,
  onDelete,
  onAdd,
}) => (
  <>
    <Textarea defaultValue={line} onChange={onChange} />
    <div className="flex space-x-2">
      <Button onClick={onSave}>Save</Button>
      <Button onClick={onDelete}>Delete</Button>
      <Button onClick={onAdd}>Add Step Below</Button>{" "}
    </div>
  </>
)

StepEditor.displayName = "StepEditor"

export default StepEditor
