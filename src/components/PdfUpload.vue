<template>
  <div class="pdf-upload">
    <h2>Upload PDF</h2>
    <input type="file" @change="onFileChange" accept="application/pdf" />
    <canvas v-if="pdfLoaded" ref="pdfCanvas" class="pdf-canvas"></canvas>
  </div>
</template>

<script>
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

export default {
  data() {
    return {
      pdfLoaded: false,
    };
  },
  methods: {
    async onFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type === "application/pdf") {
        const pdfUrl = URL.createObjectURL(file);
        await this.loadPdf(pdfUrl);
      } else {
        alert("Please upload a valid PDF file.");
      }
    },
    async loadPdf(url) {
      const pdf = await pdfjsLib.getDocument(url).promise;
      const page = await pdf.getPage(1);

      this.pdfLoaded = true;
      this.$nextTick(async () => {
        const canvas = this.$refs.pdfCanvas;
        if (canvas) {
          const context = canvas.getContext("2d");
          const viewport = page.getViewport({ scale: 1.5 });
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;
        }
      });
    },
  },
};
</script>

<style scoped>
.pdf-upload {
  text-align: center;
  margin: auto;
  max-width: 600px;
}
.pdf-canvas {
  margin-top: 20px;
  border: 1px solid #ddd;
  width: 100%;
}
</style>
