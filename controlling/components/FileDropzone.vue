<template>
    <div>
      <div ref="dropRef" class="dropzone" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { Dropzone } from "@deltablot/dropzone"
  
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
      default: 'https://backendUrl/uploadFile/'
    }
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

  onMounted(() => {
    if (dropRef.value !== null) {
      new Dropzone(dropRef.value, {
        url: props.backendUrl,
        method: 'POST',
        paramName: props.paramName,
        acceptedFiles: ".xlsx",
        previewTemplate: customPreview
      })
      .on("success", () => {
        navigateTo("/collection")
      })
      
//       const dzDefault = dropRef.value.querySelector('.dz-default')
//       if (dzDefault) {
//         dzDefault.innerHTML = `
//   <div style="display: flex; justify-content: center;">
//     <i class="bi bi-cloud-arrow-up-fill" style="font-size: 5rem;"></i>
//   </div>
//   <p style="text-align: center; margin: 0;"><strong>Dateien zum Hochladen hierher ziehen und ablegen</strong></p>
// `
//       }
    }
  })
  </script>
  
  <style scoped>
  .custom-dropzone {
    border-style: dashed;
    border-width: 3px;
    padding: 20px;
    color: rgb(114, 114, 114);
  }
  </style>