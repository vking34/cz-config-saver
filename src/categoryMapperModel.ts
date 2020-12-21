import mongoose, { Schema } from "mongoose";

const ShopeeCategoryMapperModel: Schema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: [true, 'Shopee Category ID']
        },
        cz_category_id: String,
        cz_category_level: Number
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

export default mongoose.model('shopee_catogory_mappers', ShopeeCategoryMapperModel);
