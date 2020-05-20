<template>
  <div >
    <div class="quill-container">
      <div
        :content="content"
        v-quill:myQuillEditor="editorOption"
        @change="onEditorChange($event)"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '<h1>無標題</h1><p>請寫下內容</p>',
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
                // 意思是使用插入图片的功能时候，触发文件上传控件的点击事件
                document.getElementById('getFile').click();
              }
            }
          }
        },
        theme: 'snow',
        placeholder: 'Compose an epic...'
      }
    }
  },

  created() {
  },

  computed: {
    routerId() {
      return this.$route.params.id
    }
  },

  methods: {
    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      // console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html
    },

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
}

.ql-toolbar.ql-snow {
  min-height: var(--toolbar-height);
  margin-bottom: var(--toolbar-mb);
  padding: 1rem var(--padding-width);
  border: 0;
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
}

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