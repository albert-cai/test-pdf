var express = require('express')
var app = express();
var fs = require('fs');
var stream = require('stream');
var path = require('path');
var pdfFiller = require('pdffiller');
// var hummus = require('hummus'),
//     PDFDigitalForm = require('./pdf-digital-form');
    // fs = require('fs'),
    // path = require('path');

app.get('/mockPDF', function (req, res) {
    // var pdfBuffer = new Buffer(pdfObject.EsignResponse.Output, 'base64');
    // var pdfPath = path.join('./test good' + '.pdf');
    // console.log(pdfPath);
    // let pdfFileStream = fs.createReadStream(pdfPath);
    res.setHeader('Content-Type', 'application/pdf');
    // var sourcePDF = path.resolve("test/test-template.pdf");
    var testpdf = path.resolve("test/TXTempMembCard.pdf");
    var destinationPDF = path.resolve("test/test.pdf");
    
    // try{
    //   var pdfParser = hummus.createReader(testpdf);
    //   var digitalForm = new PDFDigitalForm(pdfParser);
    //   if(digitalForm.hasForm()) {
    //     console.log(digitalForm.fields);
    //     console.log(digitalForm.createSimpleKeyValue());
    //   }
    // } catch(e) {
    //   console.log(e);
    // }
    
    membershipCard = {
      'MemberNumber': '100000000',
      'YearsAsMember': '1',
      'CardExpirationDate': '2017-10-15',
      'MemberOption': 'classic',
      'MemberName':'albert cai'
    };

    //res.setHeader('Content-Disposition', 'attachment; filename="test.pdf"'); 

    // var FDF_data = pdfFiller.generateFDFTemplate( sourcePDF, nameRegex, function(err, fdfData) {
    //     if (err) throw err;
    //     console.log(fdfData);
    // });

    pdfFiller.fillForm( testpdf, destinationPDF, membershipCard, function(err) {
        if (err) throw err;
        console.log("In callback (we're done).");
        var pdfFileStream = fs.createReadStream(destinationPDF);
        fs.unlink(destinationPDF, function(){
          res.type("application/pdf");
          pdfFileStream.pipe(res);
        });
    });
    //var doc = new PDFDocument();
    //doc.pipe(res);

    // rest of the code goes here...

    //doc.end();
    
    //pdfFileStream.pipe(res);
    //res.end(pdfBuffer);
})

app.listen(3030, function () {
  console.log('Example app listening on port 3000!')
})