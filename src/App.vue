<template>
  <div class="app">
    <h1>JSON File Comparison</h1>

    <h2>Upload JSON Files</h2>
    <FileUpload
      mode="basic"
      choose-label="Choose JSON File 1"
      @select="handleFileUpload(1, $event)"
    />
    <FileUpload
      mode="basic"
      choose-label="Choose JSON File 2"
      @select="handleFileUpload(2, $event)"
    />

    <Diff
      v-if="fileContent1 && fileContent2"
      mode="split"
      language="json"
      :prev="fileContent1"
      :current="fileContent2"
      theme="light"
      :input-delay="0"
      :virtual-scroll="{
        width: 1000,
        height: 500,
        lineMinHeight: 12,
        delay: 100,
      }"
    />

    <PdfUpload />
  </div>
  <div>
    <JsonTreeView
      class="json-item"
      v-if="content2"
      :json="content2"
      :maxDepth="3"
    />
    <JsonTreeView
      class="json-item"
      v-if="content1"
      :json="content1"
      :maxDepth="3"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import FileUpload from "primevue/fileupload";
import PdfUpload from "./components/PdfUpload.vue";
import { JsonTreeView } from "json-tree-view-vue3";
import { Diff } from "vue-diff";
import "json-tree-view-vue3/dist/style.css";

const content1 = ref(null);
const content2 = ref(null);
const fileContent1 = ref(null);
const fileContent2 = ref(null);

const handleFileUpload = (fileNumber, event) => {
  const file = event.files[0];
  if (file.type === "application/json") {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const content = JSON.parse(reader.result);
        if (fileNumber === 1) {
          fileContent1.value = JSON.stringify(content, null, 2);
          content1.value = JSON.stringify(content);
        } else {
          fileContent2.value = JSON.stringify(content, null, 2);
          content2.value = JSON.stringify(content);
        }
      } catch (error) {
        alert(`Invalid JSON file: ${error}`);
      }
    };
    reader.readAsText(file);
  } else {
    alert("Please upload a JSON file.");
  }
};
</script>

<style scoped>
.app {
  max-width: 1000px;
  margin: auto;
  text-align: center;
}
.json-item {
  margin-top: 30px;
  justify-items: center;
}
.controls button {
  margin: 5px;
}
</style>
