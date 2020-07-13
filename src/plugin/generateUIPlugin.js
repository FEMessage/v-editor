import Plugin from '@ckeditor/ckeditor5-core/src/plugin'

export default (name, plugins) =>
  class VEditorPlugin extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
      return plugins
    }

    /**
     * @inheritDoc
     */
    static get pluginName() {
      return name
    }
  }
