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
        <div class="output ql-bubble">
          <div v-html="content"></div>
        </div>
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
              // ['bold', 'italic', 'underline', 'strike'],
              // ['blockquote', 'code-block'],
              // ['image']
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['link', 'image', 'video']
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
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
      this.content = html
    },

  }
}
</script>

<style lang="scss">
  $quill-height: 60px;

  // 容器
  .quill-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-y: auto;
  }

  .ql-toolbar.ql-snow {
    flex-basis: $quill-height;
    padding: 1rem 10vw;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border: 0;
    border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  }

  .ql-container.ql-snow {
    flex-grow: 2;
    border: 0;
    padding: 2rem 10vw 1rem 10vw;
  }

  // 編輯樣式
  .ql-snow .ql-editor h1 {
    margin-bottom: 30px;
  }

</style>