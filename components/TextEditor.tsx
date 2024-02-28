import React from "react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"

interface TextEditorProps {
  line: string
  onSave: () => void
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  onDelete: () => void
  onAdd?: () => void
  showAddStep: boolean
}

const TextEditor: React.FC<TextEditorProps> = ({
  line,
  onSave,
  onChange,
  onDelete,
  onAdd,
  showAddStep = false,
}) => (
  <>
    <Textarea defaultValue={line} onChange={onChange} />
    <div className="flex space-x-2">
      <Button onClick={onSave}>Save</Button>
      <Button onClick={onDelete}>Delete</Button>
      {showAddStep && onAdd && <Button onClick={onAdd}>Add Step Below</Button>}
    </div>
  </>
)

export default TextEditor
