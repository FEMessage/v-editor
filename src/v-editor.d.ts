import Vue, {VueConstructor} from 'vue'

declare module '@femessage/v-editor' {
  class FemessageComponent extends Vue {
    static install(vue: typeof Vue): void
  }

  type CombinedVueInstance<
    Instance extends Vue,
    Data,
    Methods,
    Computed,
    Props
  > = Data & Methods & Computed & Props & Instance

  type ExtendedVue<
    Instance extends Vue,
    Data,
    Methods,
    Computed,
    Props
  > = VueConstructor<
    CombinedVueInstance<Instance, Data, Methods, Computed, Props> & Vue
  >

  type Combined<Data, Methods, Computed, Props> = Data &
    Methods &
    Computed &
    Props

  type VEditorData = {
    editor: any
    ClassicEditor: any
    isFullScreen: boolean
    uploaderAccept: string
    previewImageUrl: string
  }

  type VEditorMethods = {}

  type VEditorComputed = {}

  type VEditorProps = {
    placeholder: string
    height: number | string
    uploadOptions: object
    value: string
    editorOptions: object
    disabled: boolean
    onUploadFail: (status: boolean, error?: any) => void
    autosize: object
  }

  type VEditor = Combined<
    VEditorData,
    VEditorMethods,
    VEditorComputed,
    VEditorProps
  >

  export interface VEditorType extends FemessageComponent, VEditor {}

  const VEditorConstruction: ExtendedVue<
    Vue,
    VEditorData,
    VEditorMethods,
    VEditorComputed,
    VEditorProps
  >

  export default VEditorConstruction
}
