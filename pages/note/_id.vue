<template>
  <section v-if="templateNote" class="quill-container">
    <client-only>
      <el-button type="primary" @click="saveData()">存檔</el-button>
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
        v-model="templateNote.content"
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
      templateNote: null,
      defaultContent: '<h1>無標題</h1><p>請寫下內容</p>',
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
    this.setNoteContent()
  },

  beforeDestroy() {
    // 進行存檔
    // 內容是預設的話不做存檔
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
    async setNoteContent() {
      await this.checkMyNotes()
      this.templateNote = this.getNote(this.routerId)

      if (this.templateNote) {
        this.isNewNote = false
        // this.content = this.templateNote.content
      } else {
        this.isNewNote = true
        this.templateNote = {
          id: this.routerId,
          content: this.defaultContent,
          isStar: false
        }
      }
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

    async saveData() {
      if ( this.templateNote.content === this.defaultContent ) return

      if (this.isNewNote) {
        await create_note(this.templateNote)
        this.isNewNote = false
      } else {
        await update_note(this.templateNote)
        this.isNewNote = false
      }
    },

    onEditorBlur(editor) {
    },
    onEditorFocus(editor) {
      this.editor = editor
    },
    onEditorReady(editor) {
      this.editor = editor
    },
    onEditorChange({ editor, html, text }) {
      this.templateNote.content = html
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
    }
  }
}
</script>

<style lang="scss">
:root {
  --toolbar-height: 60px;
  --toolbar-mb: 35px;
  --padding-width: 8vw;
}

// 容器
.quill-container {
  height: 100vh;
  overflow-y: hidden;

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