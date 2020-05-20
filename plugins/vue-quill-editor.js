import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'

Vue.use(VueQuillEditor)

const fonts = ['思源黑體', 'Segoe']
const Font = VueQuillEditor.Quill.imports['formats/font']
Font.whitelist = fonts; 
VueQuillEditor.Quill.register(Font, true)