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
              [{ 'font': [] }],                                  // 字型
              [{ 'size': ['small', false, 'large', 'huge'] }],   // 字體
              ['bold', 'italic', 'underline', 'strike'],         // 粗體 斜體 下底線 刪除線
              [{ 'align': [] }],                                 // 對齊
              ['blockquote', 'code-block'],                      // 引用 程式碼
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],     // 有序列表 無序列表
              [{ 'color': [] }, { 'background': [] }],           // 文字顏色 背景顏色
              ['link', 'image']                                  // 連結 圖片 影片(video)
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