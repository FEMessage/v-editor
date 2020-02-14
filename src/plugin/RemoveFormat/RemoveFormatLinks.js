// https://ckeditor.com/docs/ckeditor5/latest/features/remove-format.html#integrating-with-editor-features
export default function RemoveFormatLinks(editor) {
  // Extend the editor schema and mark the "linkHref" model attribute as formatting.
  editor.model.schema.setAttributeProperties('linkHref', {
    isFormatting: true
  })
}
