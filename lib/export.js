import Excel from 'exceljs'
import mongoose from 'mongoose'
import Trip from './model/Trip'
import fs from 'fs'
import {
  pick
} from "lodash"

export default async () => {
  let options = {
    filename: './streamed-workbook.xlsx',
    useStyles: true,
    useSharedStrings: true,
  }

  try {
    let workbook = null,
      worksheet = null
    const filename = './streamed-workbook.xlsx'
    const exists = fs.existsSync(filename)
    console.log("exists ", exists);
    if (exists) {
      workbook = new Excel.Workbook()
      await workbook.xlsx.readFile(filename)
      worksheet = await workbook.getWorksheet('My Sheet');
      console.log("worksheet ", worksheet);
    } else {
      workbook = new Excel.stream.xlsx.WorkbookWriter(options)
      worksheet = workbook.addWorksheet('My Sheet', {
        pageSetup: {
          paperSize: 9,
          orientation: 'landscape'
        }
      });
    }
    worksheet.columns = [{
        header: 'Id',
        key: '_id',
        width: 30
      },
      {
        header: 'Title',
        key: 'title',
        width: 32
      },
      {
        header: 'Description',
        key: 'description',
        width: 100,
        outlineLevel: 1
      }
    ]
    let i = exists ? worksheet._rows.length : 1
    Trip.find({}).limit(exists ? 1000 : 5).skip(exists ? 5 : 0).cursor()
      .on('data', function (doc) {
        try {
          var row = worksheet.getRow(++i);
          let values = pick(doc.toJSON(), ["_id", "title", "description"]);
          console.log("values ", values);
          row.values = values;
          row.commit();
          // worksheet.addRow(doc).commit();
        } catch (error) {
          console.log("error add row: ", error);
        }
      })
      .on('end', function () {
        exists ? workbook.xlsx.writeFile("./new.xlsx") : workbook.commit()
        console.log('Done!');
      })
      .on('error', function (error) {
        console.log("error ", error);
      })
    // let cursor = Trip.find({}).cursor()
    // let doc = await cursor.next()
    // while (doc) {
    //   console.log(doc)
    //   doc = await cursor.next()
    // }
  } catch (error) {
    console.log("error ", error);
  }
}