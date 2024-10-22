<template>
    <div>
      <div ref="dropRef" class="dropzone"/>
    </div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { Dropzone } from "@deltablot/dropzone"
  import { format } from 'date-fns';
  
  const props = defineProps({
    paramName: {
      type: String,
      default: 'file'
    },
    token: {
      type: String,
      default: ''
    },
    backendUrl: {
      type: String,
      default: '/api'
    },
    date: Date,
  })
  
  const dropRef = ref(null)
  
  const customPreview = `
        <div class="d-flex flex-wrap dz-preview dz-processing dz-image-preview dz-complete">
          <div class="dz-image">
            <img data-dz-thumbnail>
          </div>
          <div class="dz-details">
            <div class="dz-size"><span data-dz-size></span></div>
              <div class="dz-filename"><span data-dz-name></span></div>
            </div>
            <div class="dz-progress">
              <span class="dz-upload" data-dz-uploadprogress></span>
            </div>
        </div>
      `

  const fileDate = format(props.date, "dd MMMM yyyy")

  onMounted(() => {
    if (dropRef.value !== null) {
      new Dropzone(dropRef.value, {
        url: props.backendUrl,
        method: 'POST',
        acceptedFiles: ".xlsx",
        previewTemplate: customPreview,
        renameFile: () => fileDate + '.xlsx',
      })
    }
  })
  </script>
