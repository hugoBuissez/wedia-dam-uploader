<template>
  <div
    class="dragEventContainer"
    @dragenter.prevent
    @dragover.prevent="onDragHover = true"
    @dragleave.prevent="onDragHover = false"
    @drop="onDrop"
    data-v-step="drag-drop-asset"
  >

    <div
      :class="['drag-and-drop', {'on-draghover': onDragHover}]"
    >
      <div class="drag-and-drop-container">
        <!--        <div class="text-center instruction">-->
        <!--            {{ $t('dragAndDrop.instructionTitle') }}-->
        <!--            <a href="">{{ $t('dragAndDrop.ftp') }}</a>-->
        <!--        </div>-->

        <div class="download-zone">
          <div class="description">
            <div>Test</div>
            <div class="text-center instruction-xsmall">
              <p>SubTest</p>
              <p>SubTest</p>
              <input
                v-show="false"
                type="file"
                ref="file"
                @change="filesChange"
                multiple
              >
              <a href="#" @click.prevent="$refs.file.click()" class="link pt-2">
                <i class="fas fa-arrow-right"></i>
                <!-- {{ $t('dragAndDrop.zoneIn.browse') }} -->
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DragAndDrop',
  props: {
    cursorName: { type: String, required: true },
  },
  data() {
    return {
      onDragHover: false,
      entities: [],
    };
  },
  methods: {
    onDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      this.entities = [];
      if (e.dataTransfer.items) {
        this.uploadFiles(e.dataTransfer.items).then(() => this.$emit('after-load', this.entities), err => console.error(err));
      } else {
        // IE 11
        this.uploadFilesSimple(e.dataTransfer.files);
      }
    },

    async uploadFilesSimple(files) {

      this.$emit('launch-loading');
      const entities = [];
      const entitiesInError = [];
      for (let i = 0, len = files.length; i < len; i += 1) {
        const error = await this.createReaderToCheckUploadedFile(files[i]);
        if (error === false) {
          entities.push({
            $path: this.cursorName,
            binary: files[i],
            $uploadError: error,
          });
        } else {
          entitiesInError.push({
            $path: this.cursorName,
            binary: files[i],
            $uploadError: error,
          });
        }
      }
      this.$emit('after-load', entities);
      this.$emit('after-load-error', entitiesInError);
    },

    async createReaderToCheckUploadedFile(file) {

      // TODO : exporter dans un fichier de configuration
      const rules = [
        {
          extensions: ['jpeg', 'jpg', 'png', 'gif', 'webp'],
          minSize: 10000,
          minWidth: 250,
          minHeight: 250,
        },
        {
          extensions: ['psd'],
          minSize: 10000,
        },
        {
          extensions: [],// By default
          minSize: 10,
        },
      ];

      const { name } = file;
      const fileExt = name.split('.').pop().toLowerCase();
      let isEvaluated = false;
      let haveToWaitForWidth = false;

      let width = null;
      let height = null;
      let minWidth = null;
      let minHeight = null;
      let error = false;

      rules.forEach((rule) => {
        if (!isEvaluated) {
          if (rule.extensions.length === 0 || rule.extensions.indexOf(fileExt) >= 0) {
            isEvaluated = true;
            const { minSize } = rule;

            // eslint-disable-next-line prefer-destructuring
            minWidth = rule.minWidth;
            // eslint-disable-next-line prefer-destructuring
            minHeight = rule.minHeight;
            if (minSize && file.size < minSize) {
              error = 'sizeTooSmall';
            }
            if (!error && minWidth) {
              if (typeof Image === 'function') {
                haveToWaitForWidth = true;
                const image = new Image();

                image.onload = function () {
                  width = image.naturalWidth;
                  height = image.naturalHeight;
                };
                image.src = window.URL.createObjectURL(file);
              }
            }
          }
        }
      });
      if (haveToWaitForWidth) {
        const waitForSize = async (n) => {
          if (width !== null) {
            return { width, height };
          }
          return new Promise(
            (resolve, reject) => setTimeout(
              () => waitForSize(n - 1).then(resolve, reject),
              250,
            ),
          );
        };
        await waitForSize(10.0 / 0.25);
        if (width === null || width < minWidth) {
          return 'widthTooSmall';
        }
        if (height === null || height < minHeight) {
          return 'heightTooSmall';
        }
      }
      return error;
    },

    filesChange(e) {
      e.stopPropagation();
      e.preventDefault();
      this.uploadFilesSimple(e.target.files);
    },

    uploadFiles(items) {
      this.$emit('launch-loading');
      const tmp = [];
      for (let i = 0; i < items.length; i++) {
        const itemAsEntry = items[i].webkitGetAsEntry();
        if (itemAsEntry) {
          tmp.push(this.traverseFileTree(itemAsEntry, true));
        }
      }
      return Promise.all(tmp);
    },

    traverseFileTree(item) {
      return new Promise((resolve, reject) => {
        if (item.isFile) {
          // Get file
          item.file((file) => {
            this.entities.push({
              $path: this.cursorName,
              binary: file,
            });
            resolve();
          }, () => reject('Item is not a file'));
        } else if (item.isDirectory) {
          // Get folder contents
          const dirReader = item.createReader();
          dirReader.readEntries((entries) => {
            const fileEntries = entries.filter(entry => entry.isFile);
            fileEntries.reduce((acc, file) => acc.then(() => this.traverseFileTree(file)), Promise.resolve()).then(resolve, reject);
          });
        } else {
          console.error('unknow file type');
          return reject('unknow file type');
        }
      });
    },
  },
};
</script>

<style scoped>
  .dragEventContainer {
    width: 100%;
    height: 100%;
  }
</style>