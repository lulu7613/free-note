<template>
  <section v-if="api_data" class="quill-container">
    <client-only>
      <!-- <el-button type="primary" @click="saveData()">存檔</el-button> -->
      <input
        type="file"
        style="display: none;"
        id="getFile"
        ref="getFile"
        @change="uploadFile($event)"
        accept="image/gif,image/jpeg,image/jpg,image/png"
      >
      <quill-editor
        ref="editor"
        v-model="content"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        @change="onEditorChange($event)"
      />
    </client-only>
  </section>
</template>

<script>
import { create_note, update_note } from '~/api/db.js'

export default {
  data() {
    return {
      isNewNote: null,
      api_data: null, // 存放遠端取得的 data
      content: null,  // 存放 quill 的編輯內容
      defaultContent: [
        { insert: '無標題\n\n', attributes: { bold: true, size: 'huge' } },
        { insert: '請輸入內容' },
      ],
      editor: null,
      editorOption: {
        // some quill options
        modules: {
          toolbar: {
            container: [
              [{ 'font': ['思源黑體', 'Segoe'] }],
              [{ 'size': ['small', false, 'large', 'huge'] }], 
              ['bold', 'italic', 'underline', 'strike', { 'align': [] }],
              ['blockquote', 'code-block'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'color': [] }, { 'background': [] }],
              ['link', 'image']
            ],
            handlers: {
              'image': function () {
                // 意思是使用插入圖片的功能時候，觸發文件上傳控件的點擊事件
                document.getElementById('getFile').click();
              }
            }
          }
        },
        theme: 'snow',
        placeholder: ''
      }
    }
  },

  mounted() {
    this.getNoteContent()
  },

  beforeDestroy() {
    this.saveData()
  },

  computed: {
    routerId() {
      return this.$route.params.id
    },
    myNotes() {
      return this.$store.state.db.myAllNotes
    }

  },

  methods: {
    async getNoteContent() {
      await this.checkMyNotes()
      this.api_data = this.getNote(this.routerId)

      if (this.api_data) {
        this.isNewNote = false
      } else {
        this.isNewNote = true
        this.api_data = {
          id: this.routerId,
          content: this.defaultContent,
          isStar: false
        }
      }
    },

    onEditorReady(editor) {
      this.editor = editor
      this.editor.setContents(this.api_data.content)
      this.checkTitleAttributes()
    },

    onEditorChange({ editor, html, text }) {
      this.checkTitleAttributes()
      // this.templateNote.content = html
    },

    async saveData() {
      const content = this.getEditorContents()
      const isDefaultTitle = content[0].insert.includes('無標題') && content[0].insert.length === 3
      const isDefaultContent = content[1].insert.includes('請輸入內容') && content[1].insert.length === 8

      if ( isDefaultTitle && isDefaultContent) return

      const data = _.cloneDeep(this.api_data)
      data.content = content

      if (this.isNewNote) {
        await create_note(data)
        this.isNewNote = false
      } else {
        await update_note(data)
        this.isNewNote = false
      }
    },

    uploadFile(e) {
      const file = e.target.files[0];
      const data = new FormData();
      data.append('file-to-upload', file)
      // 可以使用post方法上傳文件到服務器
      // 然後把返回的路徑拼接好插入到內容裏
      // uploadFile(data).then(res => {
      //   this.content += `<img src="${res.imgUrl}" alt="內容圖片">`;
      // })

      // 即時顯示圖片
      const vm = this
      const rang = this.editor.getSelection() // 定位鼠標的位置，content 中的序列(index)
      const lang = rang.index
      const fr = new FileReader()

      fr.onload = function (e) {
        vm.editor.insertEmbed(lang, 'image', e.target.result)
      }
      fr.readAsDataURL(file)
    },

    async checkMyNotes() {
      if (!this.myNotes) {
        await this.$store.dispatch('db/get_all_notes')
      }
    },

    getNote(routerId) {
      if (!this.myNotes) return
      return this.myNotes.find(i => i.id === routerId)
    },

    getEditorContents() {
      return this.editor.getContents().ops
    },

    checkTitleAttributes() {
      const content = this.getEditorContents()
      const isNoAttributes = !content[0].attributes // 首行沒有標題的樣式
      if (isNoAttributes) {
        this.editor.insertText(0, ' ', {bold: true, size: 'huge'})
      }
    },

    onEditorBlur(editor) {
    },
    onEditorFocus(editor) {
      this.editor = editor
    }
  }
}
</script>

<style lang="scss">
:root {
  --toolbar-height: 60px;
  --toolbar-mb: 35px;
}

// 容器
.quill-container {
  height: 100vh;
  overflow-y: auto;

  // scrollbar
  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
}

.ql-toolbar.ql-snow {
  min-height: var(--toolbar-height);
  margin-bottom: var(--toolbar-mb);
  padding: 1rem var(--padding-width);
  border: 0;
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
}

// TODO: 如果 toolbar 變成兩行，height 設定會跑掉
.ql-container.ql-snow {
  height: calc(100vh - var(--toolbar-height) - var(--toolbar-mb));
  padding: 0 var(--padding-width);
  border: 0;
}

// 自訂工具欄 font/字體
.ql-snow { 
  .ql-picker.ql-font{ 
    .ql-picker-label{ 
        &[data-value]::before { 
            content:attr(data-value); 
        } 
    } 
    .ql-picker-options{ 
        span[data-value]::before { 
            content:attr(data-value); 
        } 
    } 
  } 
}

.ql-font-思源黑體 { 
    font-family: "Noto Sans TC"; 
}
.ql-font-Segoe { 
    font-family: "Segoe UI"; 
}
</style>