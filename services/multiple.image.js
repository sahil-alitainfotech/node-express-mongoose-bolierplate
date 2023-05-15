const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const doc = new PDFDocument();

const pdfImages = async () => {
  doc.pipe(fs.createWriteStream('docPdf.pdf'));

  const images = ['img1.png', 'img2.png', 'img3.png'];

  for (const image of images) {
    if (image !== images[0]) {
      doc.addPage();
    }

    const imagePath = path.join(__dirname, '../public/images', image);
    doc.image(imagePath, {
      fit: [500, 400],
      align: 'center',
      valign: 'center'
    });
  }

  doc.end();
};

module.exports = { pdfImages };
