import ExcelJS, { Row, Worksheet } from 'exceljs';
import ShopeeCategoryMapperModel from './categoryMapperModel';
import monogoose from 'mongoose';


const saveCategoryMapping = async (ws: Worksheet) => {
    let x: number;
    for (x = 2; x < 705; x++) {
        let row: Row = ws.getRow(x);
        let cz_category_id: string = row.getCell(1).value as string;
        let cz_category_level: number = Number(row.getCell(5).value)
        // console.log('cz cat id:', cz_category_id, ', level:', cz_category_level);

        let y: number = 8;
        while (true) {
            if (row.getCell(y).value) {
                let _id: string = row.getCell(y).value as string;
                // console.log(_id);
                try {
                    await ShopeeCategoryMapperModel.create({
                        _id,
                        cz_category_id,
                        cz_category_level
                    });
                }
                catch (e) {
                    console.log('duplicate key: ', _id);
                }
                y++;
            }
            else
                break;
        }

    }
}

const mongoSettings = {
    autoIndex: process.env.AUTO_INDEX === 'true' ? true : false,
    useNewUrlParser: true,
    useUnifiedTopology: true
};
monogoose.connect(process.env.MONGODB_URI, mongoSettings);
monogoose.Promise = global.Promise;
monogoose.connection.once('open', () => {
    console.log('Connected to mongoDB!');

    let workBook = new ExcelJS.Workbook();
    workBook.xlsx.readFile('/home/user/Desktop/cz/crawling/config-saver/configs/chozoi_cate.xlsx')
        .then(workBook => {
            let ws: Worksheet = workBook.getWorksheet('Query result');
            saveCategoryMapping(ws);
        })
        .catch(e => {
            console.log(e);
        })
});



